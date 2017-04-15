const initialState = {
  username: '',
  email: '',
  loggedIn: false,
  user: null
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'LOGGED_IN': {
      return {
        ...state,
        loggedIn: true,
        username: action.user.get('username'),
        user: action.user
      };
    }
    case 'LOGGED_OUT': {
      return {
        ...state,
        loggedIn: false,
        username: '',
        user: null
      };
    }
    default:
      return state;
  }
}
