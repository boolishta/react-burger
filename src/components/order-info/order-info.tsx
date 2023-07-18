import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useEffect, useState } from 'react';
import s from './order-info.module.css';
import { getIngredientsSelector } from '../../services/selectors/selectors';
import { useLocation } from 'react-router-dom';
import { getIngredients } from '../../services/actions/ingredients';
import { getOrderDetails } from '../../utils/burger-api';
import { formatDate } from '../../utils/formatDate';
import { IngredientImage } from '../ingredient-image/ingredient-image';
import { parseStatus } from '../../utils/parseStatus';
import { TOrderDetails } from '../../interfaces/order';
import { useDispatch, useIngredients, useSelector } from '../../services/hooks';

export const OrderInfo: FC = () => {
  const [order, setOrder] = useState<TOrderDetails>();
  const [orderDate, setOrderDate] = useState('');
  const ingredients = useSelector(getIngredientsSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const orderNumber = pathname[pathname.length - 1];
  const { quantity, total } = useIngredients(
    [...ingredients],
    order?.ingredients || []
  );
  useEffect(() => {
    dispatch(getIngredients());
    getOrderDetails(orderNumber).then((res) => {
      if (res.success && res.orders[0]) {
        setOrder(res.orders[0]);
        setOrderDate(() => formatDate(res.orders[0].createdAt));
      }
    });
  }, [orderNumber, dispatch]);
  const ingredientListItem = (ingredientId: string, quantity: number) => {
    const ingredient = ingredients.find((item) => item._id === ingredientId);
    return (
      ingredient && (
        <li
          key={ingredientId}
          className={s.item}
        >
          <IngredientImage
            src={ingredient.image_mobile}
            name={ingredient.name}
          />
          <p className={s.name + ' text text_type_main-default ml-4'}>
            {ingredient.name}
          </p>
          <p className={s.total + ' text text_type_digits-default'}>
            {quantity} x {ingredient.price} <CurrencyIcon type="primary" />
          </p>
        </li>
      )
    );
  };
  const ingredientListItems = Object.entries(quantity).map(
    ([ingredientId, quantity]) => ingredientListItem(ingredientId, quantity)
  );
  return (
    <div className={s.info}>
      {order ? (
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
              {total}
              <CurrencyIcon type="primary" />
            </p>
          </div>
        </>
      ) : (
        <p className="text text_type_main-default text_color_inactive mt-10 mr-10 ml-10">
          Загрузка
        </p>
      )}
    </div>
  );
};
