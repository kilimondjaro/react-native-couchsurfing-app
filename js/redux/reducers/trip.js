const initialState = {
  numberOfTravellers: 1,
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
    default:
      return state;
  }
}
