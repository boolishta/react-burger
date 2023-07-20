import { IIngredient } from '../../interfaces/ingredient';
import { loadIngredients } from '../../utils/burger-api';
import {
  ADD_BUN,
  ADD_INGREDIENTS,
  CLEAR_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  REMOVE_INGREDIENTS,
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

interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly payload: {
    ingredient: IIngredient;
  };
}

interface IClearIngredientsAction {
  readonly type: typeof CLEAR_INGREDIENTS;
}

interface IAddIngredientsAction {
  readonly type: typeof ADD_INGREDIENTS;
  readonly payload: {
    ingredient: IIngredient & { uuid: string };
  };
}

interface IRemoveIngredientsAction {
  readonly type: typeof REMOVE_INGREDIENTS;
  readonly payload: {
    uuid: string;
  };
}

export type TIngredientsActions =
  | IIngredientsRequestAction
  | IIngredientsSuccessAction
  | IIngredientsFaildeAction
  | IAddBunAction
  | IClearIngredientsAction
  | IAddIngredientsAction
  | IRemoveIngredientsAction;

export const removeIngredientsAction = (
  uuid: string
): IRemoveIngredientsAction => ({
  type: REMOVE_INGREDIENTS,
  payload: {
    uuid,
  },
});

export const addIngredientsAction = (
  ingredient: IIngredient & { uuid: string }
): IAddIngredientsAction => ({
  type: ADD_INGREDIENTS,
  payload: {
    ingredient,
  },
});

export const clearIngredientsAction = (): IClearIngredientsAction => ({
  type: CLEAR_INGREDIENTS,
});

export const addBunAction = (ingredient: IIngredient): IAddBunAction => ({
  type: ADD_BUN,
  payload: {
    ingredient,
  },
});

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
