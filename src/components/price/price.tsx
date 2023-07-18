import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useMemo } from 'react';
import {
  getBunSelector,
  getCurrentIngredientsSelector,
} from '../../services/selectors/selectors';
import { useSelector } from '../../services/hooks';

export const Price: FC = () => {
  const currentIngredients = useSelector(getCurrentIngredientsSelector);
  const bun = useSelector(getBunSelector);
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
