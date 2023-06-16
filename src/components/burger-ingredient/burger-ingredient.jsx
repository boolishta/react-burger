import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import s from './burger-ingredient.module.css';
import { ingredientType } from '../../utils/prop-types';
import PropType from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { ItemTypes } from '../../utils/constans';
import { getIngredientsSelector } from '../../redux/selectors/selectors';

export function BurgerIngredient({ ingredient, handleClick }) {
  const [{ isDraggin }, drag] = useDrag(
    () => ({
      type: ItemTypes.INGREDIENT,
      item: { ingredient },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );
  const { currentIngredients } = useSelector(getIngredientsSelector);
  const ingredients = currentIngredients.filter(
    (item) => item._id === ingredient._id
  );
  const count = ingredients.length;
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
