import { RootState } from './../types/index';
import { TIngredientDetailsInitialState } from './../reducers/ingredientDetails';

export const getIngredientsSelector = (state: RootState) => {
  return state.ingredients.ingredients;
};
export const getCurrentIngredientsSelector = (state: RootState) =>
  state.ingredients.currentIngredients;
export const getBunSelector = (state: RootState) => state.ingredients.bun;
export const getOrderSelector = (state: RootState) => state.order.order;
export const getIngredientDetailsSelector = (
  state: TIngredientDetailsInitialState
) => state.ingredientDetails;
export const getUserSelector = (state: RootState) => state.user.user;
export const getTokenSelector = (state: RootState) => state.user.token;
export const getUserErrorSelector = (state: RootState) => state.user.error;
export const getUserSuccessLoginSelector = (state: RootState) =>
  state.user.userLoginSuccess;
export const getUserLogoutSuccessSelector = (state: RootState) =>
  state.user.userLoginSuccess;
export const getWebSocketMessages = (state: RootState) => state.ws.messages;
export const getLastWsMessage = (state: RootState) => {
  if (state.ws.messages) {
    return state.ws.messages[state.ws.messages.length - 1]?.message;
  }
  return null;
};
