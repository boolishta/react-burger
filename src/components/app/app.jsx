import React, { useEffect, useState, useReducer } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import Error from '../error/error';
import s from './app.module.css';
import { getIngredients } from '../../utils/burger-api';
import { IngredientsContext } from '../../services/ingredientsContext';

function reducer(state, action) {
  switch (action.type) {
    case 'total':
      const { amount } = action.payload;
      return { total: amount };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const initalCartState = {
  total: 0,
};

export function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cart, dispatch] = useReducer(reducer, initalCartState);

  const fetchIngredients = () => {
    setLoading(true);
    getIngredients()
      .then(({ data }) => {
        setIngredients(data);
        const total = data.reduce((acc, currentValue) => {
          return acc + currentValue.price;
        }, 0);
        dispatch({
          type: 'total',
          payload: {
            amount: total,
          },
        });
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
          <IngredientsContext.Provider value={{ ingredients, cart }}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor />
          </IngredientsContext.Provider>
        )}
      </main>
    </>
  );
}
