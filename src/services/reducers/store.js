import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_SUCCESS,
  ORDER_CHECKOUT_FAILED,
  REMOVE_INGREDIENTS,
  ADD_INGREDIENTS,
} from '../actions/store';

const initialStore = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentIngredients: [],
  ingredientDetails: {},
  order: {},
  orderRequest: false,
  orderFailed: false,
};

export const storeReducer = (state = initialStore, action) => {
  switch (action.type) {
    case ADD_INGREDIENTS: {
      const ingredient = state.ingredients.find(
        (ingredient) => ingredient._id === action.id
      );
      if (ingredient.type === 'bun') {
        const newCurrentIngredients = state.currentIngredients.filter(
          (item) => item.type !== 'bun'
        );
        newCurrentIngredients.push(ingredient);
        return {
          ...state,
          currentIngredients: newCurrentIngredients,
        };
      } else {
        return {
          ...state,
          currentIngredients: [...state.currentIngredients, ingredient],
        };
      }
    }
    case REMOVE_INGREDIENTS: {
      return {
        ...state,
        currentIngredients: state.currentIngredients.filter(
          (item) => item._id !== action.id
        ),
      };
    }
    case ORDER_CHECKOUT_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case ORDER_CHECKOUT_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        order: action.order,
      };
    }
    case ORDER_CHECKOUT_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    }
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
    default: {
      return state;
    }
  }
};
