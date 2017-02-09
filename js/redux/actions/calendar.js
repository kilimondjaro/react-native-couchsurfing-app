import type { Action } from './types';

type Calender = {
  firstMonth: number;
  dates: Array<Array<number>>;
}

module.exports = {
  calendarUpdate: (data: Calender) : Action => ({
    type: 'CALENDAR_UPDATE',
    data
  })
};
