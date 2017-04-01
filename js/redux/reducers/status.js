const initialState = {
  connection: 'none'
};

export default function status(state = initialState, action) {
  switch (action.type) {
    case 'SET_STATUS': {
      return {
        ...state,
        [action.name]: action.value
      };
    }
    default:
      return state;
  }
}
