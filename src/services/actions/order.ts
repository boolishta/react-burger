import { AppDispatch, AppThunk } from './../types/index';
import { checkout } from '../../utils/burger-api';
import { clearIngredientsAction } from './ingredients';

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';

export const orderCheckout: AppThunk = (data) => (dispatch: AppDispatch) => {
  dispatch({
    type: ORDER_CHECKOUT_REQUEST,
  });
  checkout(data).then((res) => {
    if (res && res.success) {
      dispatch({
        type: ORDER_CHECKOUT_SUCCESS,
        order: res.order,
      });
      dispatch(clearIngredientsAction());
    } else {
      dispatch({
        type: ORDER_CHECKOUT_FAILED,
      });
    }
  });
};
