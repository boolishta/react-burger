import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getIngredientsSelector } from '../../redux/selectors/selectors';
import { ICurrentIngredient } from '../burger-constructor/burger-constructor';
import { IIngredient } from '../../interfaces/ingredient';

export const Price: FC = () => {
  const {
    currentIngredients,
    bun,
  }: { currentIngredients: ICurrentIngredient[]; bun: IIngredient } =
    useSelector(getIngredientsSelector);
  const initialValue = bun ? bun.price * 2 : 0;
  const total = useMemo(
    () =>
      currentIngredients.reduce((acc, item) => acc + item.price, initialValue),
    [currentIngredients, initialValue]
  );

  return (
    <p className="text text_type_digits-medium">
      {total}
      <CurrencyIcon type="primary" />
    </p>
  );
};
