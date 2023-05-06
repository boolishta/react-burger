import {
  ADD_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  REMOVE_INGREDIENTS,
} from '../actions/ingredients';

const initalState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentIngredients: [],
};

export const ingredientsReducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_INGREDIENTS: {
      const ingredient = state.ingredients.find((i) => i._id === action.id);
      const updateIngredient = { ...ingredient, uuid: action.uuid };

      const newCurrentIngredients =
        ingredient.type === 'bun'
          ? [
              ...state.currentIngredients.filter((i) => i.type !== 'bun'),
              updateIngredient,
            ]
          : [...state.currentIngredients, updateIngredient];
      return { ...state, currentIngredients: newCurrentIngredients };
    }
    case REMOVE_INGREDIENTS: {
      return {
        ...state,
        currentIngredients: state.currentIngredients.filter(
          (item) => item.uuid !== action.uuid
        ),
      };
    }
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: false,
        ingredients: action.ingredients,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default:
      return state;
  }
};
