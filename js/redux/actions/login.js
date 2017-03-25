import Parse from 'parse/react-native';

function logIn(username, password) {
  return new Promise((resolve, reject) => {
    Parse.User.logIn(username, password, {
      success: resolve,
      error: (user, error) => {
        reject(error);
      }
    });
  });
}

module.exports = {
  logIn
};
