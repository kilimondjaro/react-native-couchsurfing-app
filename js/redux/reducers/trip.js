const initialState = {
  trips: [],
  numberOfTravelers: 1,
  tripDetail: '',
  location: null
};

export default function trip(state = initialState, action) {
  switch (action.type) {
    case 'SET_TRIP_DATA': {
      return {
        ...state,
        [action.name]: action.value
      };
    }
    case 'TRIPS_LOADED': {
      return {
        ...state,
        trips: action.trips
      };
    }
    case 'ADD_TRIP': {
      return {
        ...state,
        trips: state.trips.concat(action.trip)
      };
    }
    case 'RESET_TRIP': {
      return {
        ...initialState,
        trips: state.trips
      };
    }
    default:
      return state;
  }
}
