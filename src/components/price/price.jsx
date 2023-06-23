import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getIngredientsSelector } from '../../redux/selectors/selectors';

export default function Price() {
  const { currentIngredients, bun } = useSelector(getIngredientsSelector);
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
}
