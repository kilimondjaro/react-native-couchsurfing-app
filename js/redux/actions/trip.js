// @flow
import type { Action, ThunkAction } from './types';
import Parse from 'parse/react-native';

function createTrip(data) : ThunkAction {
  return (dispatch) => new Promise((resolve) => {
    const user = Parse.User.current();

    const Trip = Parse.Object.extend('Trip');
    const trip = new Trip();

    trip.set('numberOfTravelers', data.numberOfTravelers);
    trip.set('tripDetail', data.tripDetail);

    const arrives = data.arrives;
    const departs = data.departs;
    trip.set('arrives', new Date(arrives.year, arrives.month, arrives.day));
    trip.set('departs', new Date(departs.year, departs.month, departs.day));

    trip.set('location', data.location);
    trip.set('traveler', user);

    trip.save(null, {
      success: () => {
        resolve(dispatch({type: 'ADD_TRIP', trip: data}));
      }
    });
  });
}

function loadTrips() {
  return (dispatch) => new Promise((resolve) => {
    const user = Parse.User.current();

    const Trip = Parse.Object.extend('Trip');

    var query = new Parse.Query(Trip);
    query.equalTo('traveler', user);
    query.find({
      success: function(trips) {
        resolve(dispatch({
          type: 'TRIPS_LOADED',
          trips: trips.map(trip => trip.attributes)
        }));
      }
    });
  });
}

module.exports = {
  createTrip,
  loadTrips
};
