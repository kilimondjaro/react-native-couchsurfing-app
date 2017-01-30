// @flow
import type { Action, ThunkAction } from './types';
import {getLocations} from '../../helpers';

export function loadLocations(search: string) : ThunkAction {
  return (dispatch) => {
    search
      ? getLocations(search).then((res) => {
        dispatch(_loadedLocations(res));
      })
      : dispatch(_loadedLocations([]));
  };
}

function _loadedLocations(locations) : Action {
  return {
    type: 'LOADED_LOCATIONS',
    locations: locations
  };
}
