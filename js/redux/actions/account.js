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

function saveAccount(account): Promise {
  return new Promise((resolve, reject) => {
    if (Parse.User.current()) {
      const Account = Parse.Object.extend('Account');
      const curAccount = new Account();
      curAccount.save(account, {
        success: resolve,
        error: (_, error) => reject(error)
      });
    }
    else {
      reject();
    }
  });
}

function loadAccount(): ThunkAction {
  return (dispatch) => new Promise((resolve) => {
    if (Parse.User.current()) {
      Parse.User.current().relation('account').query().find({
        success: (account) => {
          resolve(dispatch({
            type: 'ACCOUNT_LOADED',
            account: {...account[0].attributes, id: account[0].id}
          }));
        }
      });
    }
    resolve();
  });
}

function toggleDay(date: Date) : Action {
  return {
    type: 'TOGGLE_DAY',
    year: date.year,
    month: date.month,
    day: date.day
  };
}

module.exports = {
  toggleSetting,
  setSetting,
  checkSetting,
  saveAccount,
  loadAccount,
  toggleDay
};
