import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import s from './burger-ingredients.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';

export function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = useState('one');
  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');
  return (
    <section>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <ul className={s.tabs}>
        <li>
          <Tab
            value="one"
            active={current === 'one'}
            onClick={setCurrent}
          >
            Булки
          </Tab>
        </li>
        <li>
          <Tab
            value="two"
            active={current === 'two'}
            onClick={setCurrent}
          >
            Соусы
          </Tab>
        </li>
        <li>
          <Tab
            value="three"
            active={current === 'three'}
            onClick={setCurrent}
          >
            Начинки
          </Tab>
        </li>
      </ul>
      <ul className={s.ingridients + ' custom-scroll'}>
        <li className="mt-10">
          <h2 className="text text_type_main-medium">Булки</h2>
          <ul className={s.ingridient_items}>
            {buns &&
              buns.map((bun) => (
                <BurgerIngredient
                  ingredient={bun}
                  key={bun._id}
                />
              ))}
          </ul>
        </li>
        <li className="mt-10">
          <h2 className="text text_type_main-medium">Соусы</h2>
          <ul className={s.ingridient_items}>
            {sauces &&
              sauces.map((sauce) => (
                <BurgerIngredient
                  ingredient={sauce}
                  key={sauce._id}
                />
              ))}
          </ul>
        </li>
        <li className="mt-10">
          <h2 className="text text_type_main-medium">Начинки</h2>
          <ul className={s.ingridient_items}>
            {mains &&
              mains.map((main) => (
                <BurgerIngredient
                  ingredient={main}
                  key={main._id}
                />
              ))}
          </ul>
        </li>
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};
