import { IIngredient } from '../../interfaces/ingredient';
import { ADD_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS } from '../constans';

interface IAddIngredientDetailsAction {
  readonly type: typeof ADD_INGREDIENT_DETAILS;
  readonly ingredient: IIngredient;
}

interface IClearIngredientDetailsAction {
  readonly type: typeof CLEAR_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions =
  | IAddIngredientDetailsAction
  | IClearIngredientDetailsAction;

export const addIngredientDetailsAction = (
  ingredient: IIngredient
): IAddIngredientDetailsAction => ({
  type: ADD_INGREDIENT_DETAILS,
  ingredient,
});

export const clearIngredientDetailsAction =
  (): IClearIngredientDetailsAction => ({
    type: CLEAR_INGREDIENT_DETAILS,
  });
