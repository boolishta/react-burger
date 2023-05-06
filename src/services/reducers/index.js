import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { storeReducer } from './store';

export const rootReducer = combineReducers({
  store: storeReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
});
