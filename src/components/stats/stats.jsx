import React from 'react';
import Completed from '../completed/comleted';
import OrdersBoard from '../orders-board/orders-board';
import s from './stats.module.css';

export default function Stats() {
  const ordersDone = ['034533', '034532', '034530', '034527', '034525'];
  const ordersInWord = ['034538', '034540', '034542'];
  const countTotal = 28752;
  const countToday = 138;
  return (
    <div className={s.stats}>
      <OrdersBoard
        name={'Готовы:'}
        orders={ordersDone}
        success={true}
      />
      <OrdersBoard
        name={'В работе:'}
        orders={ordersInWord}
      />
      <Completed
        extraClass={s.completed}
        name="Выполнено за все время:"
        count={countTotal}
      />
      <Completed
        extraClass={s.completed}
        name="Выполнено за сегодня:"
        count={countToday}
      />
    </div>
  );
}
