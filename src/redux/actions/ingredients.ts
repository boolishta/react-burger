import { IIngredient } from '../../interfaces/ingredient';
import { loadIngredients } from '../../utils/burger-api';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../constans';
import { AppDispatch, AppThunk } from '../types';

interface IIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<IIngredient>;
}

interface IIngredientsFaildeAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
  | IIngredientsRequestAction
  | IIngredientsSuccessAction
  | IIngredientsFaildeAction;

const getIngredientsRequestAction = (): IIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST,
});

const getIngredientsSuccessAction = (
  ingredients: ReadonlyArray<IIngredient>
): IIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients,
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequestAction());
  loadIngredients().then((res) => {
    if (res && res.success) {
      dispatch(getIngredientsSuccessAction(res.data));
    } else {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    }
  });
};
