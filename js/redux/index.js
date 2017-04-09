import { applyMiddleware, createStore } from 'redux';
import traverse from 'traverse';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate, createTransform } from 'redux-persist';
import {AsyncStorage} from 'react-native';
import combineReducers from './reducers/index';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const createCustomStore = applyMiddleware(thunk, logger)(createStore);

const dateTransform = createTransform(null, (outboundState) => {
  return traverse(outboundState).map((val) => {
    if (Date.parse(val)) {
      return new Date(val);
    }
    return val;
  });
});


function configureStore(onComplete: ?() => void) {
  // const store = createCustomStore(combineReducers);
  // setTimeout(onComplete, 100);
  const store = autoRehydrate()(createCustomStore)(combineReducers);
  persistStore(store, {
    storage: AsyncStorage,
    blacklist: ['search', 'navigation', 'location', 'filter'],
    transforms: [dateTransform]
  }, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

export default configureStore;
