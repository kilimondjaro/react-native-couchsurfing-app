type State = {
  hosts: Array<any>;
};

const initialState = {
  location: '',
  hosts: []
};

export default function search(state: State = initialState, action) {
  switch (action.type) {
    case 'FINDED_HOSTS': {
      return {...state, hosts: action.hosts};
    }
    default:
      return state;
  }
}
