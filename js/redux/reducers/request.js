const initialState = {
  requests: [],
  numberOfTravelers: 1,
  tripDetail: ''
};

export default function request(state = initialState, action) {
  switch (action.type) {
    case 'SET_REQUEST_DATA': {
      return {
        ...state,
        [action.name]: action.value
      };
    }
    case 'REQUESTS_LOADED': {
      return {
        ...state,
        trips: action.requests
      };
    }
    case 'ADD_REQUEST': {
      return {
        ...state,
        trips: state.requests.concat(action.request)
      };
    }
    case 'RESET_REQUEST': {
      return {
        ...initialState,
        trips: state.requests
      };
    }
    default:
      return state;
  }
}
