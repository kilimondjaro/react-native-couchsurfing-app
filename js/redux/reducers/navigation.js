import type {Action} from '../actions/types';

export type Tab = 'dashboard' | 'hosting' | 'search' | 'messages' | 'account';

type State = {
  tab: Tab
}

const initialState: State = { tab: 'search' };

export default function navigation(state: State = initialState, action: Action) : State {
  switch (action.type) {
    case 'SWITCH_TAB':
      return {...state, tab: action.tab};
    default:
      return state;
  }
}
