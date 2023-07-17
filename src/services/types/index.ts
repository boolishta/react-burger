import { TIngredientsActions } from './../actions/ingredients';
import { TIngredientDetailsActions } from './../actions/ingredientDetails';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TUserActions } from '../actions/user';

type TApplicationActions =
  | TIngredientDetailsActions
  | TIngredientsActions
  | TUserActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
