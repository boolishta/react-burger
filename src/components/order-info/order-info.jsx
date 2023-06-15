import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useEffect, useState } from 'react';
import s from './order-info.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsSelector } from '../../utils/selectors';
import { useLocation } from 'react-router-dom';
import { getIngredients } from '../../services/actions/ingredients';
import { getOrderDetails } from '../../utils/burger-api';
import { formatDate } from '../../utils/formatDate';
import IngredientImage from '../ingredient-image/ingredient-image';
import { parseStatus } from '../../utils/parseStatus';

export default function OrderInfo() {
  const [order, setOrder] = useState([]);
  const [ingredientsQuantity, setIngredientsQuantity] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDate, setOrderDate] = useState('');
  const { ingredients } = useSelector(getIngredientsSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const orderNumber = pathname[pathname.length - 1];
  const calculateIngredientsTotal = useCallback(
    (ingredientIds) => {
      const quantity = {};
      const prices = {};
      for (const ingredientId of ingredientIds) {
        if (quantity[ingredientId]) {
          quantity[ingredientId] += 1;
        } else {
          quantity[ingredientId] = 1;
        }

        const ingredient = ingredients.find(
          (ingredient) => ingredient._id === ingredientId
        );
        if (ingredient) {
          prices[ingredientId] = ingredient.price;
        }
      }
      setIngredientsQuantity(quantity);

      const totalPrice = Object.entries(quantity).reduce(
        (acc, [ingredientId, quantity]) => {
          const price = prices[ingredientId] || 0;
          return acc + price * quantity;
        },
        0
      );
      setTotalPrice(totalPrice);
    },
    [ingredients]
  );
  useEffect(() => {
    dispatch(getIngredients());
    getOrderDetails(orderNumber).then((res) => {
      if (res.success && res.orders[0]) {
        setOrder(res.orders[0]);
        const orderDate = new Date(res.orders[0].createdAt);
        setOrderDate(() => formatDate(orderDate));
      }
    });
  }, [orderNumber, dispatch]);
  useEffect(() => {
    if (order.ingredients) {
      calculateIngredientsTotal(order.ingredients);
    }
  }, [order.ingredients, calculateIngredientsTotal]);
  const ingredientListItem = (ingredientId, quantity) => {
    const ingredient = ingredients.find((item) => item._id === ingredientId);
    return (
      <li
        key={ingredientId}
        className={s.item}
      >
        <IngredientImage src={ingredient.image_mobile} />
        <p className={s.name + ' text text_type_main-default ml-4'}>
          {ingredient.name}
        </p>
        <p className={s.total + ' text text_type_digits-default'}>
          {quantity} x {ingredient.price} <CurrencyIcon type="primary" />
        </p>
      </li>
    );
  };
  const ingredientListItems = Object.entries(ingredientsQuantity).map(
    ([ingredientId, quantity]) => {
      return ingredientListItem(ingredientId, quantity);
    }
  );
  return (
    <div className={s.info}>
      {order.number ? (
        <>
          <p className={s.number + ' text text_type_digits-default mt-5 mb-5'}>
            #{order.number}
          </p>
          <p className="text text_type_main-medium mt-5">{order.name}</p>
          <p className={s.status + ' text text_type_main-default mt-2'}>
            {parseStatus(order.status)}
          </p>
          <p className="text text_type_main-medium mt-15 mb-7">Состав:</p>
          <ul className={s.list + ' custom-scroll'}>{ingredientListItems}</ul>
          <div className={s.bottom + ' mt-10'}>
            <p className="text text_type_main-default text_color_inactive">
              {orderDate}
            </p>
            <p className={s.total + ' text text_type_digits-default'}>
              {totalPrice}
              <CurrencyIcon type="primary" />
            </p>
          </div>
        </>
      ) : (
        <p className="text text_type_main-default text_color_inactive">
          Заказ не найден
        </p>
      )}
    </div>
  );
}
