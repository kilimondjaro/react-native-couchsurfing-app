import navigationActions from './navigation';
import calendarActions from './calendar';
import locationActions from './location';
import signupActions from './signup';

module.exports = {
  ...navigationActions,
  ...calendarActions,
  ...locationActions,
  ...signupActions
};
