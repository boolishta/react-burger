import { IIngredient } from './../../interfaces/ingredient';
import { TIngredientDetailsActions } from '../actions/ingredientDetails';
import { ADD_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS } from '../constans';

export type TIngredientDetailsInitialState = {
  ingredientDetails: IIngredient | null;
};

const ingredientDetailsInitialState: TIngredientDetailsInitialState = {
  ingredientDetails: null,
};

export const ingredientDetailsReducer = (
  state = ingredientDetailsInitialState,
  action: TIngredientDetailsActions
) => {
  switch (action.type) {
    case CLEAR_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: ingredientDetailsInitialState.ingredientDetails,
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
