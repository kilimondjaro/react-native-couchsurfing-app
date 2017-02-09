// @flow
import type {Action} from '../actions/types';

const initialState = {
  firstMonth: -1,
  dates: []
};

export type State = {
  firstMonth: number;
  dates: Array<Array<number>>;
};

export default function calendar(state: State = initialState, action: Action) : State {
  switch (action.type) {
    case 'CALENDAR_UPDATE':
      return action.data;
    default:
      return state;
  }
}
