import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useState, useEffect } from 'react';
import s from './burger-ingredients.module.css';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
  getIngredients,
} from '../../services/actions/store';
import { useInView } from 'react-intersection-observer';

export function BurgerIngredients() {
  const [bunsRef, bunsInView] = useInView({
    threshold: 0,
  });
  const [saucesRef, saucesInView] = useInView({
    threshold: 0,
  });
  const [mainsRef, mainsInView] = useInView({
    threshold: 0,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  const { ingredients } = useSelector((state) => state.store);
  const [currentTab, setCurrentTab] = useState('');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (bunsInView) {
      setCurrentTab('buns');
    } else if (saucesInView) {
      setCurrentTab('sauces');
    } else if (mainsInView) {
      setCurrentTab('mains');
    }
  }, [bunsInView, saucesInView, mainsInView]);
  const buns = useMemo(
    () => ingredients.filter((item) => item.type === 'bun'),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === 'sauce'),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item) => item.type === 'main'),
    [ingredients]
  );
  const handleCloseIngredientModal = () => {
    dispatch({
      type: CLEAR_INGREDIENT_DETAILS,
    });
    setVisible(false);
  };
  const handleOpenIngredientModal = (ingredientId) => {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      ingredientId,
    });
    setVisible(true);
  };
  const modal = () => (
    <Modal handleCloseModal={handleCloseIngredientModal}>
      <IngredientDetails />
    </Modal>
  );
  return (
    <section className={s.burger}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <ul className={s.tabs}>
        <li>
          <Tab
            value="bun"
            active={currentTab === 'buns'}
          >
            Булки
          </Tab>
        </li>
        <li>
          <Tab
            value="sauce"
            active={currentTab === 'sauces'}
          >
            Соусы
          </Tab>
        </li>
        <li>
          <Tab
            value="main"
            active={currentTab === 'mains'}
          >
            Начинки
          </Tab>
        </li>
      </ul>
      <ul className={s.ingridients + ' custom-scroll'}>
        <li className="mt-10">
          <h2
            ref={bunsRef}
            className="text text_type_main-medium"
          >
            Булки
          </h2>
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
          <h2
            ref={saucesRef}
            className="text text_type_main-medium"
          >
            Соусы
          </h2>
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
          <h2
            ref={mainsRef}
            className="text text_type_main-medium"
          >
            Начинки
          </h2>
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
