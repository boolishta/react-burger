import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import s from './burger-ingredient.module.css';
import { ingredientType } from '../../utils/prop-types';
import PropType from 'prop-types';

export function BurgerIngredient({ ingredient, handleClick }) {
  return (
    <li
      className={s.ingridient}
      onClick={() => handleClick(ingredient._id)}
    >
      <img
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className={s.price + ' text text_type_digits-default mb-1 mt-1'}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
      <Counter
        count={1}
        size="default"
        extraClass="m-1"
      />
    </li>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientType.isRequired,
  handleClick: PropType.func.isRequired,
};
