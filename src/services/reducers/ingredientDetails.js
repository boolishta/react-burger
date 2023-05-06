import {
  ADD_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
} from '../actions/ingredientDetails';

const initialStore = {
  ingredientDetails: {},
};

export const ingredientDetailsReducer = (state = initialStore, action) => {
  switch (action.type) {
    case CLEAR_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: initialStore.ingredientDetails,
      };
    }
    case ADD_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.ingredient,
      };
    }
    default: {
      return state;
    }
  }
};
