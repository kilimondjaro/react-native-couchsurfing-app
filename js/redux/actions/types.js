// @flow

export type Action =
  { type: 'SWITCH_TAB', tab: 'dashboard' | 'hosting' | 'search' | 'messages' | 'account'}
  | {type: 'LOADED_LOCATIONS', locations: Array<{description: string, id: string}> }
  | {type: 'SIGNUP_UPDATE', data: any}
  | {type: 'SIGNUP_RESET'}
  ;


export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
