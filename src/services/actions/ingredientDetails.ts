import { IIngredient } from '../../interfaces/ingredient';
import { ADD_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS } from '../constans';

// FIXME: IngredientDetails
interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT_DETAILS;
  readonly ingredient: IIngredient;
}

interface IClearIngredientAction {
  readonly type: typeof CLEAR_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions =
  | IAddIngredientAction
  | IClearIngredientAction;

export const addIngredientsAction = (
  ingredient: IIngredient
): IAddIngredientAction => ({
  type: ADD_INGREDIENT_DETAILS,
  ingredient,
});

export const clearIngredientsAction = (): IClearIngredientAction => ({
  type: CLEAR_INGREDIENT_DETAILS,
});
