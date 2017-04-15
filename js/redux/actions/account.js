// @flow
import type { Action, ThunkAction } from './types';
import Parse from 'parse/react-native';

type Date = {
  month: number;
  day: number;
  year: number;
}

function toggleSetting(name: string) : Action {
  return {
    type: 'TOGGLE_SETTING',
    name
  };
}

function setSetting(name: string, value: string) : Action {
  return {
    type: 'SET_SETTING',
    name,
    value
  };
}

function checkSetting(name: string, key: string) : Action {
  return {
    type: 'CHECK_SETTING',
    name,
    key
  };
}

function saveAccount(): ThunkAction {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    const account = getState().account;
    console.log(account);
    const user = Parse.User.current();

    if (user) {
      const Account = Parse.Object.extend('Account');
      var query = new Parse.Query(Account);
      query.equalTo('parent', user);
      query.find({
        success: function(accounts) {
          accounts[0].save(account, {
            success: resolve,
            error: (_, error) => reject(error)
          });
        }
      });
    }
    else {
      reject();
    }
  });
}

function loadAccount(): ThunkAction {
  return (dispatch) => new Promise((resolve) => {
    const user = Parse.User.current();
    if (user) {
      const Account = Parse.Object.extend('Account');
      var query = new Parse.Query(Account);
      query.equalTo('parent', user);
      query.find({
        success: function(accounts) {
          resolve(dispatch({
            type: 'ACCOUNT_LOADED',
            account: {...accounts[0].attributes, id: accounts[0].id}
          }));
        }
      });
    }
    resolve();
  });
}

function toggleDay(date: Date) : ThunkAction {
  return (dispatch, getState) => {
    dispatch({
      type: 'TOGGLE_DAY',
      year: date.year,
      month: date.month,
      day: date.day
    });
    saveAccount(getState().account);
  };
}

function setSurferStatus(status: string) : ThunkAction {
  return (dispatch, getState) => new Promise((resolve) => {
    dispatch({
      type: 'SET_SETTING',
      name: 'status',
      value: status
    });
    saveAccount().then(resolve);
  });
}

module.exports = {
  toggleSetting,
  setSetting,
  checkSetting,
  saveAccount,
  loadAccount,
  toggleDay,
  setSurferStatus
};
