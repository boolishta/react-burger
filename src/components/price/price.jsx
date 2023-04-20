import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useContext } from 'react';
import { IngredientsContext } from '../../services/ingredientsContext';

export default function Price() {
  const { cart } = useContext(IngredientsContext);

  return (
    <p className="text text_type_digits-medium">
      {cart.total}
      <CurrencyIcon type="primary" />
    </p>
  );
}
