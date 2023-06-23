import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from '../../components/app-header/app-header';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import s from './ingredient.module.css?module';
import { getIngredientsSelector } from '../../redux/selectors/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ADD_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
} from '../../redux/actions/ingredientDetails';
import Modal from '../../components/modal/modal';
import { getIngredients } from '../../redux/actions/ingredients';

export default function IngredientPage() {
  const { ingredients } = useSelector(getIngredientsSelector);
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
      dispatch({
        type: ADD_INGREDIENT_DETAILS,
        ingredient,
      });
    }
  }, [location, dispatch, ingredients]);

  const modal = () => (
    <Modal handleCloseModal={handleCloseIngredientModal}>
      <IngredientDetails />
    </Modal>
  );
  const handleCloseIngredientModal = () => {
    dispatch({
      type: CLEAR_INGREDIENT_DETAILS,
    });
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
}
