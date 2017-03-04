import { combineReducers } from 'redux';
import login from './login';
import navigation from './navigation';
import location from './location';
import signup from './signup';
import calendar from './calendar';
import hosting from './hosting';
import filter from './filter';
import search from './search';

export default combineReducers({
  login,
  navigation,
  location,
  signup,
  calendar,
  hosting,
  filter,
  search
});
