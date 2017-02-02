// @flow
import type {Action} from '../actions/types';

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastname: '',
  gender: 'Male',
  birthday: new Date(),
  location: {
    id: '',
    description: ''
  }
};

export type State = {
  email: string;
  password: string;
  firstName: string;
  lastname: string;
  gender: string;
  birthday: Date;
  location: {
    id: string;
    description: string;
  };
};

export default function signup(state: State = initialState, action: Action) : State {
  switch (action.type) {
    case 'SIGNUP_UPDATE':
      return Object.assign({}, state, action.data);
    case 'SIGNUP_RESET':
      return initialState;
    default:
      return state;
  }
}
