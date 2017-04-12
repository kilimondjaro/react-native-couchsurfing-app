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

    request.save(null, {
      success: () => {
        resolve(dispatch({type: 'ADD_REQUEST', request}));
      }
    });
  });
}

module.exports = {
  createRequest
};
