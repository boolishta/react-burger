import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppHeader } from '../../components/app-header/app-header';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import s from './ingredient.module.css';
import { getIngredientsSelector } from '../../services/selectors/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '../../components/modal/modal';
import { getIngredients } from '../../services/actions/ingredients';
import { IIngredient } from '../../interfaces/ingredient';
import {
  addIngredientDetailsAction,
  clearIngredientDetailsAction,
} from '../../services/actions/ingredientDetails';
import { useDispatch } from '../../services/hooks';

export const IngredientPage: FC = () => {
  const { ingredients }: { ingredients: IIngredient[] } = useSelector(
    getIngredientsSelector
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.isModal) {
      setVisible(true);
    } else {
      dispatch(getIngredients());
      const pathname = location.pathname.split('/');
      const id = pathname[pathname.length - 1];
      const ingredient = ingredients.find((item) => item._id === id);
      if (ingredient) {
        dispatch(addIngredientDetailsAction(ingredient));
      }
    }
  }, [location, dispatch, ingredients]);

  const modal = () => (
    <Modal handleCloseModal={handleCloseIngredientModal}>
      <IngredientDetails />
    </Modal>
  );
  const handleCloseIngredientModal = () => {
    dispatch(clearIngredientDetailsAction());
    setVisible(false);
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <section className={s.ingredient}>
        <IngredientDetails />
      </section>
      {visible && modal()}
    </>
  );
};
