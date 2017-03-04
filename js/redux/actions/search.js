// @flow
import type { ThunkAction } from './types';
import type {Filter} from '../reducers/filter';

module.exports = {
  searchHosts: (filter: Filter) : ThunkAction => {
    return (dispatch) => {
      // TODO Add real request to server
      return new Promise((resolve) => {
        dispatch({type: 'FINDED_HOSTS', hosts: []});
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    };
  }
};
