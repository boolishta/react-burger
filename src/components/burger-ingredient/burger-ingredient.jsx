import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import s from './burger-ingredient.module.css';
import PropTypes from 'prop-types';

export default function BurgerIngredient({ ingredient }) {
  return (
    <li className={s.ingridient}>
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
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }),
};
