import React, { FC, useEffect, useState } from 'react';
import { IIngredient } from '../../interfaces/ingredient';
import { IHistoryOrder, TWsOrder } from '../../interfaces/order';
import { wsConnectionStartWithToken } from '../../services/actions';
import { useDispatch, useSelector } from '../../services/hooks';
import {
  getIngredientsSelector,
  getLastWsMessage,
} from '../../services/selectors/selectors';
import { formatDate } from '../../utils/formatDate';
import { Orders } from '../orders/orders';

export const OrdersHistory: FC = () => {
  const [orders, setOrders] = useState<IHistoryOrder[]>([]);
  const wsMessage = useSelector(getLastWsMessage);
  const ingredients = useSelector(getIngredientsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStartWithToken());
  }, [dispatch]);
  useEffect(() => {
    const normalizeOrders = (orders: TWsOrder[]): IHistoryOrder[] =>
      orders.map((order) => {
        return {
          id: order._id,
          name: order.name,
          number: order.number,
          date: formatDate(order.createdAt),
          ingredients: order.ingredients.map((id) =>
            ingredients.find((ingredient) => ingredient._id === id)
          ) as IIngredient[],
        };
      });
    if (wsMessage && wsMessage.orders) {
      setOrders(normalizeOrders([...wsMessage.orders]));
    }
  }, [wsMessage, ingredients]);
  return <Orders orders={orders} />;
};
