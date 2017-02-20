// @flow
import type { Action } from './types';

type Date = {
  arrives?: {
    year: number,
    month: number,
    day: number},
  departs?: {
    year: number,
    month: number,
    day: number
  }
};

export function addDate(date: Date): Action {
  return {
    type: 'ADD_DATE',
    date
  };
}
