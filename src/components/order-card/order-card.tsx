import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useMemo } from 'react';
import s from './order-card.module.css';
import { IngredientImage } from '../ingredient-image/ingredient-image';
import { IIngredient } from '../../interfaces/ingredient';

const DISPLAYED_IMAGES_QUANTITY = 5;
interface IOrderCardProps {
  orderNumber: number;
  date: string;
  name: string;
  ingredients: IIngredient[];
}

export const OrderCard: FC<IOrderCardProps> = ({
  orderNumber,
  date,
  name,
  ingredients,
}) => {
  const totalCount = useMemo(() => {
    return ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  }, [ingredients]);
  const ingredientsQuantity = ingredients.length - 1;
  const orderIngredients = useMemo(
    () => ingredients.slice(0, 6).reverse(),
    [ingredients]
  );

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
                  {idx === 0 &&
                    ingredientsQuantity > DISPLAYED_IMAGES_QUANTITY && (
                      <p
                        className={
                          s.ingredientPreviewMore +
                          ' text text_type_main-default'
                        }
                      >
                        +{ingredientsQuantity - DISPLAYED_IMAGES_QUANTITY}
                      </p>
                    )}
                </li>
              )
          )}
        </ul>
        <div className={s.price + ' text text_type_digits-default'}>
          {totalCount}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
