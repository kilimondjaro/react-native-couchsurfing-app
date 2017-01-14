import type { Action } from './types';

export type Tab = 'dashboard' | 'hosting' | 'search' | 'messages' | 'account';

module.exports = {
  switchTab: (tab: Tab) : Action => ({
    type: 'SWITCH_TAB',
    tab
  })
};
