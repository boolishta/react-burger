import {
  ADD_BUN,
  ADD_INGREDIENTS,
  CLEAR_INGREDINETS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  REMOVE_INGREDIENTS,
} from '../constans';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  bun: null,
  currentIngredients: [],
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: { ...action.ingredient },
      };
    }
    case CLEAR_INGREDINETS: {
      return {
        ...state,
        currentIngredients: initialState.currentIngredients,
        bun: initialState.bun,
      };
    }
    case ADD_INGREDIENTS: {
      const newCurrentIngredients = [
        ...state.currentIngredients,
        { ...action.ingredient },
      ];
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
