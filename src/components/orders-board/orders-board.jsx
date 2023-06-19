import React from 'react';
import s from './orders-board.module.css';

export default function OrdersBoard({ name, orders, success }) {
  // TODO: add props types
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
