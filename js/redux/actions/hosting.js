// @flow
import type { ThunkAction } from './types';

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
  }
};
