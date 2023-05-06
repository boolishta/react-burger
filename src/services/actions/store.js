import { checkout } from '../../utils/burger-api';

export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';
export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';

export function orderCheckout(data) {
  return function (dispatch) {
    dispatch({
      type: ORDER_CHECKOUT_REQUEST,
    });
    checkout(data).then((res) => {
      if (res && res.success) {
        dispatch({
          type: ORDER_CHECKOUT_SUCCESS,
          order: res.order,
        });
      } else {
        dispatch({
          type: ORDER_CHECKOUT_FAILED,
        });
      }
    });
  };
}
