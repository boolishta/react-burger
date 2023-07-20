import {
  ORDER_CHECKOUT_FAILED,
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_SUCCESS,
} from './../constans/index';
import { AppDispatch, AppThunk } from './../types/index';
import { checkout, TAcceptedOrder } from '../../utils/burger-api';
import { clearIngredientsAction } from './ingredients';

interface IOrderCheckoutRequestAction {
  readonly type: typeof ORDER_CHECKOUT_REQUEST;
}

interface IOrderCheckoutSuccessAction {
  readonly type: typeof ORDER_CHECKOUT_SUCCESS;
  readonly payload: {
    order: TAcceptedOrder;
  };
}

interface IOrderCheckoutFailedAction {
  readonly type: typeof ORDER_CHECKOUT_FAILED;
}

export type TOrderActions =
  | IOrderCheckoutRequestAction
  | IOrderCheckoutSuccessAction
  | IOrderCheckoutFailedAction;

const orderCheckoutRequestAction = () => ({
  type: ORDER_CHECKOUT_REQUEST,
});

const orderCheckoutSuccessAction = (payload: {
  order: TAcceptedOrder;
}): IOrderCheckoutSuccessAction => ({
  type: ORDER_CHECKOUT_SUCCESS,
  payload,
});

const orderCheckoutFailedAction = () => ({
  type: ORDER_CHECKOUT_FAILED,
});

export const orderCheckout: AppThunk = (data) => (dispatch: AppDispatch) => {
  dispatch(orderCheckoutRequestAction());
  checkout(data).then((res) => {
    if (res && res.success) {
      dispatch(orderCheckoutSuccessAction({ order: res.order }));
      dispatch(clearIngredientsAction());
    } else {
      dispatch(orderCheckoutFailedAction());
    }
  });
};
