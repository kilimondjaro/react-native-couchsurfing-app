// @flow
import type { Action, ThunkAction } from './types';
import {getLocations, getLocationByCoords} from '../../helpers';

export function loadLocations(search: string) : ThunkAction {
  return (dispatch) => {
    search
      ? getLocations(search).then((res) => {
        dispatch(_loadedLocations(res));
      })
      : dispatch(_loadedLocations([]));
  };
}

export function loadLocationByCoordinates(): ThunkAction {
  return (dispatch) => new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getLocationByCoords(position.coords)
          .then(res => resolve(dispatch(_loadedLocation(res))));
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  });
}

function _loadedLocations(locations) : Action {
  return {
    type: 'LOADED_LOCATIONS',
    locations
  };
}

function _loadedLocation(location) : Action {
  return {
    type: 'LOADED_LOCATION',
    location
  };
}
