import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import s from './burger-ingredient.module.css';
import { ingredientType } from '../../utils/prop-types';
import PropType from 'prop-types';
import { useDrag } from 'react-dnd';

export function BurgerIngredient({ ingredient, handleClick }) {
  const [{ isDraggin }, drag] = useDrag(
    () => ({
      type: 'ingredient',
      item: { id: ingredient._id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );
  const count = 0; // TODO: посчитывать количество ингредиентов в заказе
  return (
    <li
      ref={drag}
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
      {!!count && (
        <Counter
          count={count}
          size="default"
          extraClass="m-1"
        />
      )}
    </li>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientType.isRequired,
  handleClick: PropType.func.isRequired,
};
