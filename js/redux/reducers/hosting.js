// @flow
import type {Action} from '../actions/types';

function getInitialDates() {
  const dates = {};
  for (let i = 0; i < 12; i++) {
    dates[i] = {};
  }
  return dates;
}

const initialState = {
  status: 'accepting',
  reservedDates: getInitialDates()
};

export type State = {
  status: string;
  reservedDates: any;
};

export default function calendar(state: State = initialState, action: Action) : State {
  switch (action.type) {
    case 'UPDATED_STATUS':
      return {...state, status: action.status};
    case 'TOGGLE_DAY': {
      const dates = Object.assign({}, state.reservedDates);
      const value = dates[action.month][action.day] || false;
      dates[action.month][action.day] = !value;
      return {
        ...state,
        reservedDates: dates
      };
    }
    default:
      return state;
  }
}
