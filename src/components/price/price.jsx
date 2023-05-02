import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Price() {
  const { currentIngredients } = useSelector((state) => state.store);
  const total = currentIngredients.reduce((acc, item) => acc + item.price, 0);

  return (
    <p className="text text_type_digits-medium">
      {total}
      <CurrencyIcon type="primary" />
    </p>
  );
}
