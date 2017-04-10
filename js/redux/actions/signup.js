import type { Action } from './types';
import Parse from 'parse/react-native';
import {initialState} from '../reducers/account';

function signupUpdate(data: any) : Action {
  return ({
    type: 'SIGNUP_UPDATE',
    data
  });
}

function signupReset() : Action {
  return ({type: 'SIGNUP_RESET'});
}

function signUp(data) : Action {
  return (dispatch) => new Promise((resolve) => {
    const user = new Parse.User();
    user.set('username', data.email);
    user.set('password', data.password);
    user.set('email', data.email);

    user.signUp(null, {
      success: function(signedUpUser) {
        const Account = Parse.Object.extend('Account');
        const account = new Account();

        const newAccount = Object.assign({}, initialState);
        newAccount.firstName = data.firstName;
        newAccount.lastName = data.lastName;
        newAccount.gender = data.gender;
        newAccount.location = data.location;
        newAccount.birthday = data.birthday;

        Object.keys(newAccount).forEach(key => account.set(key, newAccount[key]));
        account.set('parent', signedUpUser);

        account.save(null, {
          success: function(savedAccount) {
            dispatch({
              type: 'ACCOUNT_LOADED',
              account: savedAccount.attributes
            });
            resolve(dispatch({type: 'LOGGED_IN', user: signedUpUser}));
          },
          error: function(gameScore, error) {
            console.log(error);
          }
        });
      },
      error: function(_, error) {
        console.log(error);
      }
    });
  });
}

module.exports = {
  signupUpdate,
  signupReset,
  signUp
};
