// @flow
import type {Action} from '../actions/types';
const initialState = {
  locations: []
};

export type State = {
  locations: Array<{description: string, id: string}>;
};

export default function(state: State = initialState, action: Action) : State {
  switch (action.type) {
    case 'LOADED_LOCATIONS':
      return {locations: action.locations};
    default:
      return state;
  }
}
