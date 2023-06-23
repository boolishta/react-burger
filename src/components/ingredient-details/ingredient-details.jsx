import React from 'react';
import s from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { getIngredientDetailsSelector } from '../../redux/selectors/selectors';

export default function IngredientDetails() {
  const { ingredientDetails: ingredient } = useSelector(
    getIngredientDetailsSelector
  );
  return (
    ingredient && (
      <>
        <p className="text text_type_main-large">Детали ингредиента</p>
        <img
          width={520}
          height={240}
          src={ingredient.image_large}
          alt=""
        />
        <p className={s.name + ' text text_type_main-default'}>
          {ingredient.name}
        </p>
        <ul className={s.values}>
          <li className={s.value}>
            <p className="text text_type_main-default">Калории,ккал</p>
            <p className="text text_type_digits-default">
              {ingredient.calories}
            </p>
          </li>
          <li className={s.value}>
            <p className="text text_type_main-default">Белки, г</p>
            <p className="text text_type_digits-default">
              {ingredient.proteins}
            </p>
          </li>
          <li className={s.value}>
            <p className="text text_type_main-default">Жиры, г</p>
            <p className="text text_type_digits-default">{ingredient.fat}</p>
          </li>
          <li className={s.value}>
            <p className="text text_type_main-default">Углеводы, г</p>
            <p className="text text_type_digits-default">
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </>
    )
  );
}
