// @flow
import type { ThunkAction } from './types';

type Date = {
  month: number;
  day: number;
}

module.exports = {
  updateStatus: (status: string) : ThunkAction => {
    return (dispatch) => {
      // TODO Add real request to server
      return new Promise((resolve) => {
        dispatch({type: 'UPDATED_STATUS', status: status});
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    };
  },
  toggleDay: (date: Date) : ThunkAction => {
    return (dispatch) => {
      dispatch({type: 'TOGGLE_DAY', month: date.month, day: date.day});
    };
  }
};
