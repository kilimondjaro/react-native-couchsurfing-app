import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import AsyncStorage from 'react-native';
import combineReducers from './reducers/index';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const createCustomStore = applyMiddleware(thunk)(createStore);

function configureStore(onComplete: ?() => void) {
  const store = createCustomStore(combineReducers);
  // const store = autoRehydrate()(createCustomStore)(combineReducers);
  // persistStore(store, { storage: AsyncStorage }, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

export default configureStore;
