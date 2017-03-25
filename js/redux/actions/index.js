import navigationActions from './navigation';
import calendarActions from './calendar';
import locationActions from './location';
import signupActions from './signup';
import hostingActions from './hosting';
import accountActions from './account';
import loginActions from './login';

module.exports = {
  ...navigationActions,
  ...calendarActions,
  ...locationActions,
  ...signupActions,
  ...hostingActions,
  ...accountActions,
  ...loginActions
};
