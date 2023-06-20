import React, { useEffect, useState } from 'react';
import { AppHeader } from '../components/app-header/app-header';
import s from './feed.module.css';
import Stats from '../components/stats/stats';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnectionStart } from '../redux/actions';
import {
  getIngredientsSelector,
  getLastWsMessage,
} from '../redux/selectors/selectors';
import Orders from '../components/orders/orders';
import { getIngredients } from '../redux/actions/ingredients';
import { formatDate } from '../utils/formatDate';

export default function FeedPage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const [doneOrders, setDoneOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const wsMessage = useSelector(getLastWsMessage);
  const { ingredients } = useSelector(getIngredientsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStart());
    dispatch(getIngredients());
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
    if (wsMessage) {
      const pendingOrders = [];
      const doneOrders = [];
      for (const order of wsMessage.orders) {
        if (order.status === 'done') {
          doneOrders.push(order.number);
        } else if (order.status === 'pending') {
          pendingOrders.push(order.number);
        }
      }
      setDoneOrders(doneOrders);
      setPendingOrders(pendingOrders);
      setOrders(normalizeOrders(wsMessage.orders));
      setTotal(wsMessage.total);
      setTotalToday(wsMessage.totalToday);
    }
  }, [wsMessage, ingredients]);
  return (
    <>
      <AppHeader />
      <main className={s.feed + ' mt-10'}>
        <p className="text text_type_main-large">Лента заказов</p>
        <div className={s.columns + ' mt-5'}>
          <Orders orders={orders} />
          <Stats
            total={total}
            totalToday={totalToday}
            doneOrderNumbers={doneOrders}
            pendingOrderNumbers={pendingOrders}
          />
        </div>
      </main>
    </>
  );
}
