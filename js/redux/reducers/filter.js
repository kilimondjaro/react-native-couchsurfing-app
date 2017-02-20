

const initialState = {
  dates: {
    arrives: null,
    departs: null
  },
  numberOfTravelers: 1,
  accommodation: [],
  hasReferences: false,
  verifiedMember: false,
  gender: [],
  languageSpoken: [],
  ageRange: '',
  kidsAtHome: false,
  kidsFriendly: false,
  petFree: false,
  petFriendly: false,
  allowsSmoking: false,
  wheelchairAccessible: false,
  acceptingGuests: false,
  maybeAcceptingGuests: false,
  wantsToMeetUp: false,
  distance: 5,
  sortBy: 'bestMatch'
};

export default function filter(state = initialState, action) {
  switch (action.type) {
    case 'ADD_DATE': {
      if (state.dates.arrives && !state.dates.departs) {
        if (action.date.month < state.dates.arrives.month) {
          return {...state, dates: {arrives: action.date, departs: state.dates.arrives}};
        }
        if (action.date.month === state.dates.arrives.month && action.date.day < state.dates.arrives.day) {
          return {...state, dates: {arrives: action.date, departs: state.dates.arrives}};
        }
        if (action.date.day === state.dates.arrives.day && action.date.month === state.dates.arrives.month) {
          return state;
        }
        return {...state, dates: {arrives: state.dates.arrives, departs: action.date}};
      }
      return {...state, dates: {arrives: action.date, departs: null}};
    }
    default:
      return state;
  }
}
