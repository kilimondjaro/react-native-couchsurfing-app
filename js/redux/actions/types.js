// @flow

export type Action =
  { type: 'SWITCH_TAB', tab: 'dashboard' | 'hosting' | 'search' | 'messages' | 'account'}
  | {type: 'LOADED_LOCATIONS', locations: Array<{decription: string, id: string}> }
  ;


export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
