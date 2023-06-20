export const getIngredientsSelector = (state) => state.ingredients;
export const getOrderSelector = (state) => state.order;
export const getIngredientDetailsSelector = (state) => state.ingredientDetails;
export const getUserSelector = (state) => state.user;
export const getWebSocketMessages = (state) => state.ws.messages;
export const getLastWsMessage = (state) => {
  if (state.ws.messages) {
    return state.ws.messages[state.ws.messages.length - 1]?.message;
  }
  return null;
};
