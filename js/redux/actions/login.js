import Parse from 'parse/react-native';

function logIn(username, password) {
  return (dispatch) => new Promise((resolve, reject) => {
    Parse.User.logIn(username, password, {
      success: (user) => {
        user.relation('account').query().find({
          success: (account) => {
            dispatch({
              type: 'ACCOUNT_LOADED',
              account: {...account[0].attributes, id: account[0].id}
            });
            resolve(dispatch({type: 'LOGGED_IN', user}));
          }
        });
      },
      error: (user, error) => {
        reject(error);
      }
    });
  });
}

function logOut() {
  return new Promise((resolve, reject) => {
    Parse.User.logOut().then(() => {
      resolve();
    });
  });
}

module.exports = {
  logIn,
  logOut
};
