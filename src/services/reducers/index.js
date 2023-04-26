import { combineReducers } from 'redux';
import { storeReducer } from './store';

export const rootReducer = combineReducers({
  store: storeReducer,
});
