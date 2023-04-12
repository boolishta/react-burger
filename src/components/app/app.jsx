import React, { useEffect, useState } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import Error from '../error/error';
import s from './app.module.css';
import { getIngredients } from '../../utils/burger-api';

export function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchIngredients = () => {
    setLoading(true);
    getIngredients()
      .then(({ data }) => {
        setIngredients(data);
      })
      .catch(() => {
        setError(() => setError(true));
      })
      .finally(() => {
        setLoading(false);
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
        {loading && (
          <p className="text text_type_digits-default m-2">Загрузка ...</p>
        )}
        {ingredients && (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}
      </main>
    </>
  );
}
