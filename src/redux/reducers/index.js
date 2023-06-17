import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { ingredientDetailsReducer } from './ingredientDetails';
import { userReducer } from './user';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  ingredientDetails: ingredientDetailsReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
  ws: wsReducer,
});
