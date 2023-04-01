import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import s from './burger-ingredients.module.css';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import { ingredientsType } from '../../utils/prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details';
export function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = useState('bun');
  const [visible, setVisible] = useState(false);
  const [ingredient, setIngredient] = useState();
  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');
  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => setVisible(false);
  const modal = () => (
    <IngredientDetails
      ingredient={ingredient}
      handleCloseModal={handleCloseModal}
    />
  );
  const handleOpenIngredientModal = (id) => {
    const currentIngredient = ingredients.find((item) => item._id === id);
    setIngredient(() => currentIngredient);
    handleOpenModal();
  };
  return (
    <section className={s.burger}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <ul className={s.tabs}>
        <li>
          <Tab
            value="bun"
            active={current === 'bun'}
            onClick={setCurrent}
          >
            Булки
          </Tab>
        </li>
        <li>
          <Tab
            value="sauce"
            active={current === 'sauce'}
            onClick={setCurrent}
          >
            Соусы
          </Tab>
        </li>
        <li>
          <Tab
            value="main"
            active={current === 'main'}
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
                  handleClick={handleOpenIngredientModal}
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
                  handleClick={handleOpenIngredientModal}
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
                  handleClick={handleOpenIngredientModal}
                  ingredient={main}
                  key={main._id}
                />
              ))}
          </ul>
        </li>
      </ul>
      {visible && modal()}
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: ingredientsType,
};
