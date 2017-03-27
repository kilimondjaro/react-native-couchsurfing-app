type State = {
  hosts: Array<any>;
};

const initialState = {
  location: '',
  hosts: [],
  members: []
};

export default function search(state: State = initialState, action) {
  switch (action.type) {
    case 'FINDED_HOSTS': {
      return {...state, hosts: action.hosts};
    }
    case 'FINDED_MEMBERS': {
      return {...state, members: action.members};
    }
    case 'SET_LOCATION_ID': {
      return {...state, locationId: action.locationId};
    }
    default:
      return state;
  }
}
