import React from 'react';
import s from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

export default function IngredientDetails() {
  const { image_large, calories, name, proteins, fat, carbohydrates } =
    useSelector((state) => state.store.ingredientDetails);
  return (
    <>
      <p className="text text_type_main-large">Детали ингредиента</p>
      <img
        width={520}
        height={240}
        src={image_large}
        alt=""
      />
      <p className={s.name + ' text text_type_main-default'}>{name}</p>
      <ul className={s.values}>
        <li className={s.value}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">{calories}</p>
        </li>
        <li className={s.value}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{proteins}</p>
        </li>
        <li className={s.value}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{fat}</p>
        </li>
        <li className={s.value}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}
