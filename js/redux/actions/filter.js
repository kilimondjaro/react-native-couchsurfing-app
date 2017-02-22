// @flow
import type { Action } from './types';

type Date = {
    year: number,
    month: number,
    day: number
};

export function addDate(date: Date): Action {
  return {
    type: 'ADD_DATE',
    date
  };
}

export function toggleFilter(filter: any): Action {
  return {
    type: 'TOGGLE_FILTER',
    filter
  };
}
