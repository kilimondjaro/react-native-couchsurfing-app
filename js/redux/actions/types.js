// @flow

export type Action =
  { type: 'SWITCH_TAB', tab: 'dashboard' | 'hosting' | 'search' | 'messages' | 'account'}
  | {type: 'LOADED_LOCATIONS', locations: Array<{description: string, id: string}> }
  | {type: 'LOADED_LOCATION', location: ?string }
  | {type: 'SIGNUP_UPDATE', data: any}
  | {type: 'SIGNUP_RESET'}
  | {type: 'CALENDAR_UPDATE', data: {firstMonth: number, dates: Array<Array<number>>}}
  | {type: 'UPDATED_STATUS', status: string}
  | {type: 'TOGGLE_DAY', year: number, month: number, day: number}
  | {type: 'ADD_DATE', date: {year: number, month: number, day: number}}
  | {type: 'TOGGLE_FILTER', filter: any}
  | {type: 'FINDED_HOSTS', hosts: Array<any>}
  | {type: 'TOGGLE_SETTING', name: string}
  | {type: 'SET_SETTING', name: string, value: string}
  | {type: 'CHECK_SETTING', name: string, key: string}
  | {type: 'ACCOUNT_SAVE_SUCCESS'}
  | {type: 'ACCOUNT_LOADED', account: {[name: string]: any}}
  ;


export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
