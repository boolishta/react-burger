import React from 'react';
import { Completed } from '../completed/comleted';
import OrdersBoard from '../orders-board/orders-board';
import s from './stats.module.css';
import PropType from 'prop-types';

export default function Stats({
  total,
  totalToday,
  doneOrderNumbers,
  pendingOrderNumbers,
}) {
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
}

Stats.propTypes = {
  total: PropType.number,
  totalToday: PropType.number,
  doneOrderNumbers: PropType.arrayOf(PropType.number),
  pendingOrderNumbers: PropType.arrayOf(PropType.number),
};
