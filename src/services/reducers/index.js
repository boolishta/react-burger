import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { ingredientDetailsReducer } from './ingredientDetails';

export const rootReducer = combineReducers({
  ingredientDetails: ingredientDetailsReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
});
