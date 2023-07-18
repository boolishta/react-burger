import { TAcceptedOrder } from '../../utils/burger-api';
import { TOrderActions } from '../actions/order';
import {
  ORDER_CHECKOUT_FAILED,
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_SUCCESS,
} from '../constans';

type TOrderState = {
  order: TAcceptedOrder;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialStore = {
  order: {},
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialStore, action: TOrderActions) => {
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
        order: action.payload.order,
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
