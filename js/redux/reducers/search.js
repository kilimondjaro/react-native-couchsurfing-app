type State = {
  hosts: []
};

export default function search(state, action) {
  switch (action.type) {
    case 'FINDED_HOSTS': {
      return action.hosts;
    }
    default:
      return state;
  }
}
