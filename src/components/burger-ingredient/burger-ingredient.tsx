import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import s from './burger-ingredient.module.css';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { ItemTypes } from '../../utils/constans';
import { getIngredientsSelector } from '../../redux/selectors/selectors';
import { IIngredient } from '../../interfaces/ingredient';
import { ICurrentIngredient } from '../burger-constructor/burger-constructor';

interface IBurgerIngredientProps {
  ingredient: IIngredient;
  handleClick: (ingredientId: string) => void;
}

export const BurgerIngredient: FC<IBurgerIngredientProps> = ({
  ingredient,
  handleClick,
}) => {
  const [_, drag] = useDrag(
    () => ({
      type: ItemTypes.INGREDIENT,
      item: { ingredient },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );
  const { currentIngredients }: { currentIngredients: ICurrentIngredient[] } =
    useSelector(getIngredientsSelector);
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
};
