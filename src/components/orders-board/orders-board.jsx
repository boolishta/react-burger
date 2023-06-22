import React from 'react';
import s from './orders-board.module.css';
import PropType from 'prop-types';

export default function OrdersBoard({ name, orders, success }) {
  return (
    <div className={s.orders}>
      <p className="text text_type_main-default mb-6">{name}</p>
      <ul className={`${s.list} ${success ? s.success : ''}`}>
        {orders?.map((item, idx) => (
          <li
            key={idx}
            className="text text_type_digits-default mb-2"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

OrdersBoard.propTypes = {
  name: PropType.string.isRequired,
  orders: PropType.arrayOf(PropType.number).isRequired,
  success: PropType.bool,
};
