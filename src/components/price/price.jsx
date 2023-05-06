import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getIngredientsSelector } from '../../utils/selectors';

export default function Price() {
  const { currentIngredients } = useSelector(getIngredientsSelector);
  const total = useMemo(
    () =>
      currentIngredients.reduce((acc, item) => {
        let price = item.price;
        if (item.type === 'bun') {
          price += item.price;
        }
        return acc + price;
      }, 0),
    [currentIngredients]
  );

  return (
    <p className="text text_type_digits-medium">
      {total}
      <CurrencyIcon type="primary" />
    </p>
  );
}
