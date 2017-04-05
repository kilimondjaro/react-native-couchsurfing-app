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
    default:

  }
  return state;
}
