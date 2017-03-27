// @flow
import type { ThunkAction } from './types';
import type {Filter} from '../reducers/filter';
import Parse from 'parse/react-native';

function setUpHostFilters(query, filter) {
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
    wheelchairAccessible
  } = filter;

  const accommodationMap = {
    private: 'Private Room',
    public: 'Public Room',
    shared: 'Shared Room'
  };
  const accomoationFilter = Object.keys(accommodation)
    .filter(key => accommodation[key] === true)
    .map(key => accommodationMap[key]);
  if (accomoationFilter.length > 0) {
    query.containedIn('sleepingArrangement', accomoationFilter);
  }

  query.greaterThanOrEqualTo('maxGuests', numberOfTravelers);
  if (verifiedMember) {
    query.equalTo('verified.status', 'Verified');
  }

  const genderFilter = Object.keys(gender)
    .filter(key => gender[key] === true)
    .map(key => gender[key]);
  if (genderFilter.length > 0) {
    query.containedIn('preferredGender', genderFilter);
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

  const statusFilter = Object.keys(status)
    .filter(key => status[key] === true)
    .map(key => status[key]);
  if (statusFilter.length > 0) {
    query.containedIn('status', statusFilter);
  }

  //TODO Add filters: sortBy, distance, languageSpoken, dates

}

function searchHosts(locationId: string, filter: Filter) {
  // console.log(filter);
  return (dispatch) => new Promise((resolve) => {
    var Account = Parse.Object.extend('Account');
    var query = new Parse.Query(Account);

    query.equalTo('location.id', locationId);
    setUpHostFilters(query, filter);

    query.find({
      success: (result) => {
        resolve(dispatch({type: 'FINDED_HOSTS', hosts: result}));
        console.log(result);
      },
      error: (err) => {
        console.log(err);
      }
    })
  });
}


module.exports = {
  searchHosts
};
