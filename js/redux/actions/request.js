// @flow
import type { Action, ThunkAction } from './types';
import Parse from 'parse/react-native';

function createRequest(data) : ThunkAction {
  return (dispatch) => new Promise((resolve) => {
    const user = Parse.User.current();

    const Request = Parse.Object.extend('Request');
    const request = new Request();

    request.set('numberOfTravelers', data.numberOfTravelers);
    request.set('tripDetail', data.tripDetail);

    const arrives = data.arrives;
    const departs = data.departs;
    request.set('arrives', new Date(arrives.year, arrives.month, arrives.day));
    request.set('departs', new Date(departs.year, departs.month, departs.day));

    request.set('traveler', user);
    request.set('host', data.host);

    request.set('hostAccepted', false);
    request.set('travelerAccepted', false);

    request.save(null).then(() => {
      resolve(dispatch({type: 'ADD_REQUEST', request}))
    });
  });
}

function loadRequests() {
  return (dispatch) => new Promise((resolve) => {
    const user = Parse.User.current();

    const Request = Parse.Object.extend('Request');

    var travelerQuery = new Parse.Query(Request);
    travelerQuery.equalTo('traveler', user);

    var hostQuery = new Parse.Query(Request);
    hostQuery.equalTo('host', user);

    var query = Parse.Query.or(travelerQuery, hostQuery);
    query.include('traveler.account');

    query.find().then(result => Promise.all(result.map((req) => {
      const Account = Parse.Object.extend('Account');
      var accountQuery = new Parse.Query(Account);
      let type;
      if (user.id === req.get('traveler').id) {
        accountQuery.equalTo('parent', req.get('host'));
        type = 'traveler';
      } else {
        accountQuery.equalTo('parent', req.get('traveler'));
        type = 'host';
      }
      return accountQuery.find().then(acc => {
        console.log(acc);
        if (type === 'traveler') {
          return {
            type,
            ...req.attributes,
            id: req.id,
            host: acc[0].attributes
          };
        }
        return {
          type,
          ...req.attributes,
          id: req.id,
          traveler: acc[0].attributes
        };
      });
    })))
    .then(res => resolve(dispatch({type: 'REQUESTS_LOADED', requests: res})));
  });
}

function acceptRequest(id: string, type: string) {
  return (dispatch) => new Promise((resolve) => {
    const Request = Parse.Object.extend('Request');
    const request = new Request();
    request.id = id;

    if (type === 'host') {
      request.set('hostAccepted', true);
    } else {
      request.set('travelerAccepted', true);
    }
    console.log(request);

    request.save().then(() => {
      resolve(dispatch({type: 'ACCEPT_REQUEST', id}));
    });
  });
}

function removeRequest(id: string) {
  return (dispatch) => new Promise((resolve) => {
    const Request = Parse.Object.extend('Request');
    const request = new Request();
    request.id = id;

    request.destroy().then(() => {
      dispatch({type: 'REMOVE_REQUEST', id});
    });
  });
}

module.exports = {
  createRequest,
  loadRequests,
  acceptRequest,
  removeRequest
};
