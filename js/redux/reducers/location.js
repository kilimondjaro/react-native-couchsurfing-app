// @flow
import type {Action} from '../actions/types';
const initialState = {
  locations: [],
  location: null
};

export type State = {
  locations: Array<{description: string, id: string}>;
};

export default function(state: State = initialState, action: Action) : State {
  switch (action.type) {
    case 'LOADED_LOCATIONS':
      return {...state, locations: action.locations};
    case 'LOADED_LOCATION':
      return {...state, location: action.location};
    default:
      return state;
  }
}
