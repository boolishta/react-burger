import React, { FC } from 'react';
import { Completed } from '../completed/comleted';
import { OrdersBoard } from '../orders-board/orders-board';
import s from './stats.module.css';

interface IStatsProps {
  total: number;
  totalToday: number;
  doneOrderNumbers: number[];
  pendingOrderNumbers: number[];
}

export const Stats: FC<IStatsProps> = ({
  total,
  totalToday,
  doneOrderNumbers,
  pendingOrderNumbers,
}) => {
  return (
    <div className={s.stats}>
      <OrdersBoard
        name={'Готовы:'}
        orders={doneOrderNumbers}
        success={true}
      />
      <OrdersBoard
        name={'В работе:'}
        orders={pendingOrderNumbers}
      />
      <Completed
        extraClass={s.completed}
        name="Выполнено за все время:"
        count={total}
      />
      <Completed
        extraClass={s.completed}
        name="Выполнено за сегодня:"
        count={totalToday}
      />
    </div>
  );
};
