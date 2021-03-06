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
        requests: action.requests
      };
    }
    case 'ADD_REQUEST': {
      return {
        ...state,
        requests: state.requests.concat(action.request)
      };
    }
    case 'RESET_REQUEST': {
      return {
        ...initialState,
        requests: state.requests
      };
    }
    case 'RESET_REQUESTS': {
      return initialState;
    }
    case 'ACCEPT_REQUEST': {
      return {
        ...state,
        requests: state.requests.map(req => req.id === action.id
          ? {...req, hostAccepted: true} : req)
      };
    }
    case 'REMOVE_REQUEST': {
      return {
        ...state,
        requests: state.requests.filter(req => req.id !== action.id)
      };
    }
    default:
      return state;
  }
}
