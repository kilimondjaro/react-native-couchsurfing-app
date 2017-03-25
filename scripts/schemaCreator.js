import Parse from 'parse/node';
import {accountTemplate} from '../js/config';

const SERVER_PORT = process.env.PORT || 8080;
Parse.initialize('couchsurfing-app');
Parse.serverURL = `http://localhost:${SERVER_PORT}/parse`;

// async function create(type, properties) {
//   const typeClass = Parse.Object.extend(type);
//   const obj = new typeClass();
//   obj.set('color', 'yellow');
//   await obj.save();
//
//   await new Parse.Query(typeClass)
//     .each(record => record.destroy());
// }
//
// create('Car2');

async function createAccount() {
  const Account = Parse.Object.extend('Account');
  const account = new Account();
  Object.keys(accountTemplate).map(key => {
    account.set(key, accountTemplate[key]);
  });
  await account.save();
}

function createSchema() {
  createAccount();
}

createSchema();
