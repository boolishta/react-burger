import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnectionStartWithToken } from '../../redux/actions';
import {
  getIngredientsSelector,
  getLastWsMessage,
} from '../../redux/selectors/selectors';
import { formatDate } from '../../utils/formatDate';
import Orders from '../orders/orders';

export default function OrdersHistory() {
  const [orders, setOrders] = useState([]);
  const wsMessage = useSelector(getLastWsMessage);
  const { ingredients } = useSelector(getIngredientsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStartWithToken());
  }, [dispatch]);
  useEffect(() => {
    const normalizeOrders = (orders) =>
      orders.map((order) => {
        return {
          id: order._id,
          name: order.name,
          number: order.number,
          date: formatDate(order.createdAt),
          ingredients: order.ingredients.map((id) =>
            ingredients.find((ingredient) => ingredient._id === id)
          ),
        };
      });
    if (wsMessage && wsMessage.orders) {
      setOrders(normalizeOrders(wsMessage.orders));
    }
  }, [wsMessage, ingredients]);
  return <Orders orders={orders} />;
}
