// @flow
import type {Action} from '../actions/types';

const initialState = {
  status: 'accepting'
};

export type State = {
  status: string;
};

export default function calendar(state: State = initialState, action: Action) : State {
  switch (action.type) {
    case 'UPDATED_STATUS':
      return {...state, status: action.status};
    default:
      return state;
  }
}
