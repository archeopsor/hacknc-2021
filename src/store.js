import { createStore } from 'redux';
import wordcloudReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

/* eslint-disable no-underscore-dangle */
const store = createStore(wordcloudReducer, composeWithDevTools());
/* eslint-enable */

export default store;