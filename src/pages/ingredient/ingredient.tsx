import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from '../../components/app-header/app-header';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import s from './ingredient.module.css';
import { getIngredientsSelector } from '../../redux/selectors/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '../../components/modal/modal';
import { getIngredients } from '../../redux/actions/ingredients';
import { IIngredient } from '../../interfaces/ingredient';
import {
  addIngredientsAction,
  clearIngredientsAction,
} from '../../redux/actions/ingredientDetails';

export const IngredientPage: FC = () => {
  const { ingredients }: { ingredients: IIngredient[] } = useSelector(
    getIngredientsSelector
  );
  const location = useLocation();
  const dispatch = useDispatch<any>();
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
        dispatch(addIngredientsAction(ingredient));
      }
    }
  }, [location, dispatch, ingredients]);

  const modal = () => (
    <Modal handleCloseModal={handleCloseIngredientModal}>
      <IngredientDetails />
    </Modal>
  );
  const handleCloseIngredientModal = () => {
    dispatch(clearIngredientsAction());
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
