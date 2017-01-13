import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import AsyncStorage from 'react-native';
import compbineReducers from './reducers/index';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var createStore = applyMiddleware(thunk, logger)(createStore);

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createStore)(compbineReducers);
  persistStore(store, { storage: AsyncStorage }, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

export default configureStore;
