import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useMemo, useState } from 'react';
import s from './order-card.module.css';
import IngredientImage from '../ingredient-image/ingredient-image';
import PropType from 'prop-types';
import { ingredientsType } from '../../utils/prop-types';

export default function OrderCard({ orderNumber, date, name, ingredients }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const total = ingredients.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );
    setTotal(total);
  }, [ingredients]);
  const ingredientsQuantity = ingredients.length - 1;
  const [orderIngredients, setOrderIngredients] = useState([]);
  useMemo(() => {
    const slicedIngredients = ingredients.slice(0, 6).reverse();
    setOrderIngredients(slicedIngredients);
  }, [ingredients]);

  return (
    <div className={s.orderCard}>
      <div className={s.top}>
        <p className="text text_type_digits-default">#{orderNumber}</p>
        <p className="text text_type_main-default text_color_inactive">
          {date}
        </p>
      </div>
      <p className="text text_type_main-medium">{name}</p>
      <div className={s.bottom}>
        <ul className={s.ingredients}>
          {orderIngredients.map(
            (ingredient, idx) =>
              idx < 6 && (
                <li
                  key={idx}
                  className={s.ingredientPreview}
                >
                  <IngredientImage src={ingredient.image} />
                  {idx === 0 && ingredientsQuantity > 5 && (
                    <p
                      className={
                        s.ingredientPreviewMore + ' text text_type_main-default'
                      }
                    >
                      +{ingredientsQuantity - 5}
                    </p>
                  )}
                </li>
              )
          )}
        </ul>
        <div className={s.price + ' text text_type_digits-default'}>
          {total}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  orderNumber: PropType.number.isRequired,
  date: PropType.string.isRequired,
  name: PropType.string.isRequired,
  ingredients: ingredientsType,
};
