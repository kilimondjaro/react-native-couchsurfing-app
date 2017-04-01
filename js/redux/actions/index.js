import navigationActions from './navigation';
import calendarActions from './calendar';
import locationActions from './location';
import signupActions from './signup';
import accountActions from './account';
import loginActions from './login';
import statusActions from './status';

module.exports = {
  ...navigationActions,
  ...calendarActions,
  ...locationActions,
  ...signupActions,
  ...accountActions,
  ...loginActions,
  ...statusActions
};
