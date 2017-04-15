// @flow
import type { ThunkAction } from './types';
import type {Filter} from '../reducers/filter';
import Parse from 'parse/react-native';

function setUpHostFilters(query, filter, type) {
  const {
    status,
    accommodation,
    numberOfTravelers,
    verifiedMember,
    gender,
    ageRange,
    kidsAtHome,
    kidsFriendly,
    petFree,
    petFriendly,
    allowsSmoking,
    wheelchairAccessible,
    dates
  } = filter;

  const {arrives, departs} = dates;
  if (arrives && departs) {
    for (let m = arrives.month; m <= departs.month; m++) {
      for (let d = arrives.day; d <= departs.day; d++) {
        query.notEqualTo(`reservedDates.${m}.${d}`, true);
      }
    }
  }

  const genderFilter = Object.keys(gender)
    .filter(key => gender[key] === true);
  if (genderFilter.length > 0) {
    query.containedIn('preferredGender', genderFilter);
  }

  const statusFilter = Object.keys(status)
    .filter(key => status[key] === true);
  if (statusFilter.length > 0) {
    query.containedIn('status', statusFilter);
  }

  if (ageRange !== 'Any') {
    const startDate = new Date();
    const endDate = new Date();
    const range = ageRange.split('-');
    startDate.setFullYear(startDate.getFullYear() - range[1]);
    endDate.setFullYear(endDate.getFullYear() - range[0]);
    query.greaterThanOrEqualTo('birthday', startDate);
    query.lessThanOrEqualTo('birthday', endDate);
  }

  if (verifiedMember) {
    query.equalTo('verified.status', 'Verified');
  }

  if (type === 'host') {
    const accommodationMap = {
      private: 'Private Room',
      public: 'Public Room',
      shared: 'Shared Room'
    };
    const accomodationFilter = Object.keys(accommodation)
      .filter(key => accommodation[key] === true);
    if (accomodationFilter.length > 0) {
      query.containedIn('sleepingArrangement', accomodationFilter);
    }

    query.greaterThanOrEqualTo('maxGuests', numberOfTravelers);

    if (kidsAtHome) {
      query.equalTo('kidsAtHome', true);
    }

    if (kidsFriendly) {
      query.equalTo('kidFriendly', true);
    }

    if (petFree) {
      query.equalTo('petsAtHome', false);
    }

    if (petFriendly) {
      query.equalTo('petFriendly', true);
    }

    if (kidsAtHome) {
      query.equalTo('kidsAtHome', true);
    }

    if (allowsSmoking) {
      query.equalTo('smokingAllowed', true);
    }

    if (wheelchairAccessible) {
      query.equalTo('wheelchairAccessible', true);
    }
  }
  //TODO Add filters: sortBy, distance, languageSpoken, dates
}

function searchMembers(name: string) {
  return (dispatch, getState) => new Promise((resolve) => {
    var Account = Parse.Object.extend('Account');
    var firstword = new Parse.Query(Account);
    var secondWord = new Parse.Query(Account);

    const nameArr = name.split(' ');

    if (nameArr.length ===  1) {
      firstword.startsWith('firstName', nameArr[0]);
      secondWord.startsWith('lastName', nameArr[0]);
    }
    else {
      firstword.startsWith('firstName', nameArr[0]);
      firstword.startsWith('lastName', nameArr[1]);

      secondWord.startsWith('lastName', nameArr[0]);
      secondWord.startsWith('firstName', nameArr[1]);
    }

    var mainQuery = Parse.Query.or(firstword, secondWord);
    mainQuery.notEqualTo('parent', getState().user.user);
    mainQuery.find({
      success: (result) => {
        resolve(dispatch({type: 'FINDED_MEMBERS', members: result}));
        console.log(result);
      },
      error: (err) => {
        console.log(err);
      }
    });
  });
}

function searchHosts(locationId: string, filter: Filter) {
  return (dispatch, getState) => new Promise((resolve) => {
    dispatch({type: 'SET_LOCATION_ID', locationId });

    var Account = Parse.Object.extend('Account');
    var query = new Parse.Query(Account);

    query.limit(10);
    query.skip(0); //TODO Make it dynamic

    query.equalTo('location.id', locationId);

    query.notEqualTo('parent', getState().user.user);

    setUpHostFilters(query, filter, 'host');


    //TODO Use count query for showing total number
    query.find({
      success: (result) => {
        resolve(dispatch({type: 'FINDED_HOSTS', hosts: result}));
        console.log(result);
      },
      error: (err) => {
        console.log(err);
      }
    });
  });
}

function setUpTravelersFilters(query, filter) {
  const {
    status,
    verifiedMember,
    gender,
    ageRange
  } = filter;


  const genderFilter = Object.keys(gender)
    .filter(key => gender[key] === true);
  if (genderFilter.length > 0) {
    query.containedIn('gender', genderFilter);
  }

  const statusFilter = Object.keys(status)
    .filter(key => status[key] === true);
  if (statusFilter.length > 0) {
    query.containedIn('status', statusFilter);
  }

  if (ageRange !== 'Any') {
    const startDate = new Date();
    const endDate = new Date();
    const range = ageRange.split('-');
    startDate.setFullYear(startDate.getFullYear() - range[1]);
    endDate.setFullYear(endDate.getFullYear() - range[0]);
    query.greaterThanOrEqualTo('birthday', startDate);
    query.lessThanOrEqualTo('birthday', endDate);
  }

  if (verifiedMember) {
    query.equalTo('verified.status', 'Verified');
  }
}

function searchTravelers(locationId: string, filter: Filter) {
  return (dispatch, getState) => new Promise((resolve) => {
    dispatch({type: 'SET_LOCATION_ID', locationId });

    var Trip = Parse.Object.extend('Trip');
    var query = new Parse.Query(Trip);

    query.equalTo('location.id', locationId);
    query.include('traveler');
    query.greaterThanOrEqualTo('arrives', new Date());
    query.notEqualTo('traveler', getState().user.user);

    const {arrives, departs} = filter.dates;
    if (arrives && departs) {
      query.greaterThanOrEqualTo('arrives', new Date(arrives.year, arrives.month, arrives.day));
      query.lessThanOrEqualTo('departs', new Date(departs.year, departs.month, departs.day));
    }


    query.find().then(travelers => Promise.all(travelers.map((traveler) => {
      const Account = Parse.Object.extend('Account');
      const accountQuery = new Parse.Query(Account);

      accountQuery.equalTo('parent', traveler.get('traveler'));
      setUpTravelersFilters(accountQuery, filter);
      return accountQuery.find().then(acc => {
        if (acc.length === 0) {
          return null;
        }
        return {
          ...traveler.attributes,
          traveler: acc[0].attributes
        };
      });
    }))).then((travelers) => {
      resolve(dispatch({type: 'FINDED_TRAVELERS', travelers: travelers.filter(t => t)}));
    });
  });
}


module.exports = {
  searchHosts,
  searchMembers,
  searchTravelers
};
