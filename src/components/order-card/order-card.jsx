import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useState } from 'react';
import s from './order-card.module.css';
import img from '../../images/illustration.png';
import { NavLink } from 'react-router-dom';
import IngredientImage from '../ingredient-image/ingredient-image';

export default function OrderCard({
  orderNumber,
  date,
  name,
  ingredients,
  price,
}) {
  const ingredientsQuantity = ingredients.length - 1;
  const [orderIngredients, setOrderIngredients] = useState([]);
  useMemo(() => {
    const slicedIngredients = ingredients.slice(0, 6).reverse();
    setOrderIngredients(slicedIngredients);
  }, [ingredients]);

  return (
    <NavLink
      to={`/feed/${orderNumber}`}
      className={s.orderCard}
    >
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
                  <IngredientImage src={img} />
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
          {price}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </NavLink>
  );
}
