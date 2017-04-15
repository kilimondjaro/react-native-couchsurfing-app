import { combineReducers } from 'redux';
import navigation from './navigation';
import location from './location';
import signup from './signup';
import calendar from './calendar';
import filter from './filter';
import search from './search';
import user from './user';
import account from './account';
import status from './status';
import trip from './trip';
import request from './request';

export default combineReducers({
  navigation,
  location,
  signup,
  calendar,
  filter,
  search,
  user,
  account,
  status,
  trip,
  request
});
