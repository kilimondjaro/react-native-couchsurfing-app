type State = {
  hosts: Array<any>;
};

const initialState = {
  hosts: []
};

export default function search(state: State = initialState, action) {
  switch (action.type) {
    case 'FINDED_HOSTS': {
      return action.hosts;
    }
    default:
      return state;
  }
}
