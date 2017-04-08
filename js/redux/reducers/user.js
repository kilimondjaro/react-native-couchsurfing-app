const initialState = {
  username: '',
  email: '',
  loggedIn: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'LOGGED_IN': {
      return {
        ...state,
        loggedIn: true,
        username: action.user.get('username')
      };
    }
    case 'LOGGED_OUT': {
      return {
        ...state,
        loggedIn: false,
        username: ''
      };
    }
    default:

  }
  return state;
}
