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
    .filter(key => gender[key] === true)
    .map(key => gender[key]);
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
      .filter(key => accommodation[key] === true)
      .map(key => accommodationMap[key]);
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
  return (dispatch) => new Promise((resolve) => {
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
  return (dispatch) => new Promise((resolve) => {
    dispatch({type: 'SET_LOCATION_ID', locationId });

    var Account = Parse.Object.extend('Account');
    var query = new Parse.Query(Account);

    query.equalTo('location.id', locationId);
    setUpHostFilters(query, filter, 'host');

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


module.exports = {
  searchHosts,
  searchMembers
};
