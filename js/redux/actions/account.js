// @flow
import type { Action } from './types';

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

module.exports = {
  toggleSetting,
  setSetting,
  checkSetting
}
