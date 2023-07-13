import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useState, useEffect, FC } from 'react';
import s from './burger-ingredients.module.css';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { getIngredients } from '../../redux/actions/ingredients';
import { getIngredientsSelector } from '../../redux/selectors/selectors';
import { useNavigate } from 'react-router-dom';
import { IIngredient } from '../../interfaces/ingredient';
import { addIngredientsAction } from '../../redux/actions/ingredientDetails';
import { useDispatch } from '../../hooks/hooks';

export const BurgerIngredients: FC = () => {
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
  const { ingredients }: { ingredients: IIngredient[] } = useSelector(
    getIngredientsSelector
  );
  const [currentTab, setCurrentTab] = useState('');
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
  const navigate = useNavigate();
  const handleOpenIngredientModal = (ingredientId: string) => {
    const ingredient = ingredients.find((item) => item._id === ingredientId);
    if (ingredient) {
      dispatch(addIngredientsAction(ingredient));
      navigate(`ingredients/${ingredientId}`, { state: { isModal: true } });
    }
  };
  return (
    <section className={s.burger}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <ul className={s.tabs}>
        <li>
          <Tab
            value="bun"
            active={currentTab === 'buns'}
            onClick={() => null}
          >
            Булки
          </Tab>
        </li>
        <li>
          <Tab
            value="sauce"
            active={currentTab === 'sauces'}
            onClick={() => null}
          >
            Соусы
          </Tab>
        </li>
        <li>
          <Tab
            value="main"
            active={currentTab === 'mains'}
            onClick={() => null}
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
    </section>
  );
};
