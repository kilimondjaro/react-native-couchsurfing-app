// @flow

export type Action =
  { type: 'SWITCH_TAB', tab: 'dashboard' | 'hosting' | 'search' | 'messages' | 'account'}
  | {type: 'LOADED_LOCATIONS', locations: Array<{description: string, id: string}> }
  | {type: 'SIGNUP_UPDATE', data: any}
  | {type: 'SIGNUP_RESET'}
  | {type: 'CALENDAR_UPDATE', data: {firstMonth: number, dates: Array<Array<number>>}}
  | {type: 'UPDATED_STATUS', status: string}
  | {type: 'TOGGLE_DAY', year: number, month: number, day: number}
  ;


export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
