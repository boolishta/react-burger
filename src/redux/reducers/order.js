import {
  ORDER_CHECKOUT_FAILED,
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_SUCCESS,
} from '../actions/order';

const initialStore = {
  order: {},
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialStore, action) => {
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
    default: {
      return state;
    }
  }
};
