import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IIngredient } from '../../interfaces/ingredient';
import { IHistoryOrder, IOrder } from '../../interfaces/order';
import { wsConnectionStartWithToken } from '../../services/actions';
import {
  getIngredientsSelector,
  getLastWsMessage,
} from '../../services/selectors/selectors';
import { formatDate } from '../../utils/formatDate';
import { Orders } from '../orders/orders';

export const OrdersHistory: FC = () => {
  const [orders, setOrders] = useState<IHistoryOrder[]>([]);
  const wsMessage = useSelector(getLastWsMessage);
  const { ingredients }: { ingredients: IIngredient[] } = useSelector(
    getIngredientsSelector
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStartWithToken());
  }, [dispatch]);
  useEffect(() => {
    const normalizeOrders = (orders: IOrder[]) =>
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
      setOrders(normalizeOrders(wsMessage.orders));
    }
  }, [wsMessage, ingredients]);
  return <Orders orders={orders} />;
};
