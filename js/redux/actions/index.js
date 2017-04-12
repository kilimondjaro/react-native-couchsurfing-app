import navigationActions from './navigation';
import calendarActions from './calendar';
import locationActions from './location';
import signupActions from './signup';
import accountActions from './account';
import loginActions from './login';
import searchActions from './search';
import statusActions from './status';
import tripActions from './trip';

module.exports = {
  ...navigationActions,
  ...calendarActions,
  ...locationActions,
  ...signupActions,
  ...accountActions,
  ...loginActions,
  ...searchActions,
  ...statusActions,
  ...tripActions
};
