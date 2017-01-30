import { combineReducers } from 'redux';
import login from './login';
import navigation from './navigation';
import location from './location';

export default combineReducers({
  login,
  navigation,
  location
});
