import {
  ADD_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
} from '../actions/store';

const initialStore = {
  ingredientDetails: {},
};

export const storeReducer = (state = initialStore, action) => {
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
        ingredientDetails: state.ingredients.find(
          (ingredient) => ingredient._id === action.ingredientId
        ),
      };
    }
    default: {
      return state;
    }
  }
};
