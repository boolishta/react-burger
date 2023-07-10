import React, { FC, useEffect, useState } from 'react';
import { AppHeader } from '../../components/app-header/app-header';
import s from './feed.module.css';
import { Stats } from '../../components/stats/stats';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnectionClosed, wsConnectionStart } from '../../redux/actions';
import {
  getIngredientsSelector,
  getLastWsMessage,
} from '../../redux/selectors/selectors';
import { Orders } from '../../components/orders/orders';
import { getIngredients } from '../../redux/actions/ingredients';
import { formatDate } from '../../utils/formatDate';
import { STATUS } from '../../utils/constans';
import { IIngredient } from '../../interfaces/ingredient';
import { IHistoryOrder, IOrder } from '../../interfaces/order';

type TWsOrder = Omit<IOrder, 'owner' | 'price'>;

export const FeedPage: FC = () => {
  const [orders, setOrders] = useState<IHistoryOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const [doneOrders, setDoneOrders] = useState<number[]>([]);
  const [pendingOrders, setPendingOrders] = useState<number[]>([]);
  const wsMessage = useSelector(getLastWsMessage);
  const { ingredients }: { ingredients: IIngredient[] } = useSelector(
    getIngredientsSelector
  );
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(wsConnectionStart());
    dispatch(getIngredients());
    return () => dispatch(wsConnectionClosed());
  }, [dispatch]);

  useEffect(() => {
    const normalizeOrders = (orders: TWsOrder[]): IHistoryOrder[] =>
      orders.map((order) => {
        return {
          id: order._id,
          name: order.name,
          number: order.number,
          date: formatDate(order.createdAt),
          ingredients: order.ingredients.map((id: string) =>
            ingredients.find((ingredient) => ingredient._id === id)
          ),
        } as IHistoryOrder;
      });
    if (wsMessage) {
      const pendingOrders = [];
      const doneOrders = [];
      for (const order of wsMessage.orders) {
        if (order.status === STATUS.DONE) {
          doneOrders.push(order.number);
        } else if (order.status === STATUS.PENDING) {
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
};
