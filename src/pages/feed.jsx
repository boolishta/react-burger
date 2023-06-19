import React, { useEffect, useState } from 'react';
import { AppHeader } from '../components/app-header/app-header';
import s from './feed.module.css';
import Stats from '../components/stats/stats';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_START } from '../redux/actions';
import {
  getIngredientsSelector,
  getWebSocketMessages,
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
  const messages = useSelector(getWebSocketMessages);
  const { ingredients } = useSelector(getIngredientsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
    });
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
    if (Object.keys(messages).length !== 0) {
      const { message } = messages[messages.length - 1];
      const pendingOrders = [];
      const doneOrders = [];
      for (const order of message.orders) {
        if (order.status === 'done') {
          doneOrders.push(order.number);
        } else if (order.status === 'pending') {
          pendingOrders.push(order.number);
        }
      }
      setDoneOrders(doneOrders);
      setPendingOrders(pendingOrders);
      setOrders(normalizeOrders(message.orders));
      setTotal(message.total);
      setTotalToday(message.totalToday);
    }
  }, [messages, ingredients]);
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
