import React, { useEffect, useState } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import Error from '../error/error';
import s from './app.module.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

export function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);

  const fetchIngredients = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setIngredients(data.data))
      .catch(() => {
        setError(() => setError(true));
      });
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return error ? (
    <Error />
  ) : (
    <>
      <AppHeader />
      <main className={s.order}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </>
  );
}
