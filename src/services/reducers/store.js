import {
  ADD_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_SUCCESS,
  ORDER_CHECKOUT_FAILED,
} from '../actions/store';

const initialStore = {
  ingredientDetails: {},
  order: {},
  orderRequest: false,
  orderFailed: false,
};

export const storeReducer = (state = initialStore, action) => {
  switch (action.type) {
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

    default: {
      return state;
    }
  }
};
