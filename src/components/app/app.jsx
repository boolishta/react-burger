import React, { useEffect, useState, useReducer } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import Error from '../error/error';
import s from './app.module.css';
import { getIngredients } from '../../utils/burger-api';
import { IngredientsContext } from '../../services/ingredientsContext';
import { DetailsContext } from '../../services/detailsContext';

function reducer(state, action) {
  switch (action.type) {
    case 'total':
      const { amount } = action.payload;
      return { total: amount };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const initialCartState = {
  total: 0,
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'name':
      const { name } = action.payload;
      return { name };
    case 'number':
      const { number } = action.payload;
      return { number };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const initialOrderState = {};

export function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cart, dispatch] = useReducer(reducer, initialCartState);
  const [order, dispatchOrder] = useReducer(orderReducer, initialOrderState);

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
          <IngredientsContext.Provider
            value={{ ingredients, cart, dispatchOrder }}
          >
            <DetailsContext.Provider value={{ order }}>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor />
            </DetailsContext.Provider>
          </IngredientsContext.Provider>
        )}
      </main>
    </>
  );
}
