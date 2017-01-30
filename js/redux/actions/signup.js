import type { Action } from './types';

module.exports = {
  signupUpdate: (data: any) : Action => ({
    type: 'SIGNUP_UPDATE',
    data
  }),
  signupReset: () : Action => ({ type: 'SIGNUP_RESET' })
};
