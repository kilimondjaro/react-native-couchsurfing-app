function getInitialDates() {
  const dates = {};
  for (let i = 0; i < 12; i++) {
    dates[i] = {};
  }
  return dates;
}

export const initialState = {
  id: '',
  active: new Date(),
  firstName: '',
  lastName: '',
  location: {
    description: '',
    id: ''
  },
  createdAt: new Date(),
  verified: {
    status: 'Partially Verified',
    parts: {
      payment: true,
      phone: false,
      governmentId: false,
      address: false
    }
  },
  reservedDates: getInitialDates(),
  status: 'accepting',
  birthday: null,
  email: '',
  phone: '',
  gender: 'Male',
  emergencyName: '',
  emergencyPhone: '',
  emergencyEmail: '',
  emergencyNotes: '',
  experience: {
    hosted: [{reference: 'Nice guy!', from: 'id', star: true}],
    stayedWith: [{reference: 'Nice guy!', from: 'id', star: true}]
  },
  friends: ['friendId'],
  responseRate: 0,
  photoAlbums: [
    {
      title: 'Profile Photos',
      photos: [1,2,3]
    },
    {
      title: 'Couch Photos',
      photos: []
    }
  ],
  maxGuests: 1,
  preferredGender: 'Any',
  sameDayRequests: true,
  smokingAllowed: true,
  kidFriendly: false,
  petFriendly: true,
  multipleGroupsOk: false,
  languagesImFluentIn: {
    russian: true,
    english: true,
    france: false
  },
  sleepingArrangement: 'Shared Room',
  petsAtHome: false,
  kidsAtHome: false,
  smoker: false,
  wheelchairAccessible: false,
  publicTransit: '',
  descriptionOfSleepingArrengements: '',
  roommateSituation: '',
  whatYouCanShareWithGuests: '',
  additionalInformation: '',
  aboutMe: '',
  interests: [],
  interestsDescription: '',
  countriesIveLivedIn: {
    england: true,
    france: true,
    italy: false
  },
  countriesIveVisited: {
    england: true,
    france: true,
    italy: false
  },
  availableNightsToHost: {
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true
  },
  oneAmazingThingIveDone: '',
  musicMoviesBooks: '',
  whyImOnCouchsurfing: '',
  whatIcanShareWithHosts: '',
  teachLearnShare: ''
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SETTING': {
      return {...state, [action.name]: !state[action.name]};
    }
    case 'SET_SETTING': {
      return {...state, [action.name]: action.value};
    }
    case 'CHECK_SETTING': {
      const setting = state[action.name];
      const keyValue = state[action.name][action.key];

      return {
        ...state,
        [action.name]: {...setting, [action.key]: !keyValue}
      };
    }
    case 'ACCOUNT_LOADED': {
      return action.account;
    }
    case 'TOGGLE_DAY': {
      const value = state.reservedDates[action.month][action.day] || false;
      // TODO Replace it with some library function
      const dates = Object.assign({}, state.reservedDates,
        {[action.month]: Object.assign({},
          state.reservedDates[action.month], {[action.day]: !value})});
      return {
        ...state,
        reservedDates: dates
      };
    }
  }
  return state;
}
