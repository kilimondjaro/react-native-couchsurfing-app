import Parse from 'parse/react-native';

function logIn(username, password) {
  return (dispatch) => new Promise((resolve, reject) => {
    Parse.User.logIn(username, password, {
      success: (user) => {
        const Account = Parse.Object.extend('Account');
        var query = new Parse.Query(Account);
        query.equalTo('parent', user);
        query.find({
          success: function(accounts) {
            dispatch({
              type: 'ACCOUNT_LOADED',
              account: {...accounts[0].attributes, id: accounts[0].id}
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
  return (dispatch) => new Promise((resolve, reject) => {
    Parse.User.logOut().then(() => {
      dispatch({type: 'RESET_REQUESTS'});
      dispatch({type: 'RESET_ACCOUNT'});
      resolve(dispatch({type: 'LOGGED_OUT'}));
    });
  });
}

module.exports = {
  logIn,
  logOut
};
