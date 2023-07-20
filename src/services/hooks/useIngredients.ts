import { IIngredient } from '../../interfaces/ingredient';

export const useIngredients = (
  ingredients: IIngredient[],
  ingredientIds: string[]
) => {
  const quantity: { [key: string]: number } = {};
  const prices: { [key: string]: number } = {};
  for (const ingredientId of ingredientIds) {
    if (quantity[ingredientId]) {
      quantity[ingredientId] += 1;
    } else {
      quantity[ingredientId] = 1;
    }

    const ingredient = ingredients.find(
      (ingredient) => ingredient._id === ingredientId
    );
    if (ingredient) {
      prices[ingredientId] = ingredient.price;
    }
  }

  const total = Object.entries(quantity).reduce(
    (acc, [ingredientId, quantity]) => {
      const price = prices[ingredientId] || 0;
      return acc + price * quantity;
    },
    0
  );

  return { quantity, total };
};
