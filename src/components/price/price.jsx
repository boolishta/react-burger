import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

export default function Price() {
  return (
    <p className="text text_type_digits-medium">
      610
      <CurrencyIcon type="primary" />
    </p>
  );
}
