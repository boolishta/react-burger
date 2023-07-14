import { IIngredient } from '../../interfaces/ingredient';
import { TIngredientsActions } from '../actions/ingredients';
import {
  ADD_BUN,
  ADD_INGREDIENTS,
  CLEAR_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  REMOVE_INGREDIENTS,
} from '../constans';

export type TIngredientsState = {
  ingredients: ReadonlyArray<IIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  bun: IIngredient | null;
  currentIngredients: ReadonlyArray<IIngredient & { uuid: string }>;
};

const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  bun: null,
  currentIngredients: [],
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: { ...action.payload.ingredient },
      };
    }
    case CLEAR_INGREDIENTS: {
      return {
        ...state,
        currentIngredients: initialState.currentIngredients,
        bun: initialState.bun,
      };
    }
    case ADD_INGREDIENTS: {
      const newCurrentIngredients = [
        ...state.currentIngredients,
        { ...action.payload.ingredient },
      ];
      return { ...state, currentIngredients: newCurrentIngredients };
    }
    case REMOVE_INGREDIENTS: {
      return {
        ...state,
        currentIngredients: state.currentIngredients.filter(
          (item) => item.uuid !== action.payload.uuid
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
