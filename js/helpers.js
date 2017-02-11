// @flow
import {googleKey} from './config';

export function getLocations(place) {
  // eslint-disable-next-line
  return fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&key=${googleKey}`)
  .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 'ZERO_RESULTS') {
          return [];
        }
        if (responseJson.status === 'OK') {
          return responseJson.predictions.map((loc) => ({
            description: loc.description,
            id: loc.id
          }));
        }
        return [];
      })
      .catch((error) => {
        console.error(error);
      });
}


const monthTable = {
  common: [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5],
  leap: [6, 2, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5]
};

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const currentDate = new Date();
const curMonth = currentDate.getMonth();
const curYear = currentDate.getFullYear();
let isLeap = false;

if (curYear % 400 === 0 || (curYear % 4 === 0 && curYear % 100 !== 0)) {
  months[1] = 29;
  isLeap = true;
}

function getDayOfWeek(year, month, day) {
  const y = year % 100;
  return (day + monthTable[isLeap ? 'leap' : 'common'][month]
    + Math.floor(y / 4) + y) % 7;
}

export function getCalendarDates() {
  let firstDay = getDayOfWeek(curYear, curMonth, 1);
  firstDay = (firstDay - 2) % 7; // offset for correct days order (mon - sun)

  const dates = [];
  for (let i = 0; i < 12; i++) {
    const m = (i + curMonth) % 12;
    const daysInMonth = months[m];
    dates.push({
      dates: [],
      month: m,
      year: m !== (i + curMonth) ? curYear + 1 : curYear
    });

    let dayOfWeek, date;

    let week = [null, null, null, null, null, null, null];
    dayOfWeek = firstDay;

    for (date = 1; date <= daysInMonth; ++date) {
      week[dayOfWeek] = date;

      if (++dayOfWeek > 6) {
        dates[i].dates.push(week);
        week = [null, null, null, null, null, null, null];
        dayOfWeek = 0;
      }
    }

    firstDay = dayOfWeek;
  }

  return dates;
}
