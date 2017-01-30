import { combineReducers } from 'redux';
import login from './login';
import navigation from './navigation';
import location from './location';
import signup from './signup';

export default combineReducers({
  login,
  navigation,
  location,
  signup
});
