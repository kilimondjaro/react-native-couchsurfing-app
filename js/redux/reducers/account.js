const initialState = {
  active: new Date(),
  firstName: 'Kirill',
  lastName: 'Babich',
  location: 'Moscow, Moscow, Russian Federation',
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
  status: 'accepting',
  birthday: new Date(1990, 18, 5),
  email: 'email@gmail.com',
  phone: '1234567890',
  gender: 'Male',
  emergencyName: 'Kirill',
  emergencyPhone: '1234567890',
  emergencyEmail: 'email@gmail.com',
  emergencyNotes: 'Some notes',
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
  additionalInformation: 'My home is located near the center of the city.',
  aboutMe: 'I\'m a Russian student from Moscow.',
  interests: ['guitar', 'music', 'The Beatles', 'Photography', 'Traveling'],
  interestsDescription: 'I like playing guitar',
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
  return state;
}
