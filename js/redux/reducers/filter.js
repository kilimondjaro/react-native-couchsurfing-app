type Date = {
  year: number;
  month: number;
  day: number;
}

export type Filters = {
  dates: {
    arrives: ?Date,
    departs: ?Date
  };
  numberOfTravelers: number;
  accommodation: {
    private: boolean;
    public: boolean;
    shared: boolean;
  };
  hasReferences: boolean;
  verifiedMember: boolean;
  gender: {
    male: boolean;
    female: boolean;
    other: boolean;
  };
  languageSpoken: any;
  ageRange: string;
  kidsAtHome: boolean;
  kidsFriendly: boolean;
  petFree: boolean;
  petFriendly: boolean;
  allowsSmoking: boolean;
  wheelchairAccessible: boolean;
  acceptingGuests: boolean;
  maybeAcceptingGuests: boolean;
  wantsToMeetUp: boolean;
  distance: number;
  sortBy: string;
}

const initialState = {
  dates: {
    arrives: null,
    departs: null
  },
  numberOfTravelers: 1,
  accommodation: {
    private: false,
    public: false,
    shared: false
  },
  hasReferences: false,
  verifiedMember: false,
  gender: {
    male: false,
    female: false,
    other: false
  },
  languageSpoken: {},
  ageRange: 'Any',
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
    case 'TOGGLE_FILTER': {
      const {name, value} = action.filter;
      if (typeof state[name] === 'boolean') {
        return {...state, [name]: !state[name]};
      }
      if (typeof state[name] === 'object') {
        return {...state, [name]: Object.assign({}, state[name], {[value]: !state[name][value]})};
      }
      return {...state, [name]: value};
    }
    default:
      return state;
  }
}
