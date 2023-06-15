import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderCard from '../order-card/order-card';
import data from '../../utils/data.json';
import s from './orders.module.css?module';

export default function Orders() {
  const navigate = useNavigate();
  const handleOpenFeedModal = (orderNumber) => {
    navigate(`/feed/${orderNumber}`, { state: { isModal: true } });
  };

  return (
    <ul className={s.orders + ' custom-scroll'}>
      {data.orders.map((order) => (
        <li
          key={order.number}
          onClick={() => handleOpenFeedModal(order.number)}
        >
          <OrderCard
            orderNumber={order.number}
            date={order.date}
            name={order.name}
            price={order.price}
            ingredients={order.ingredients}
          />
        </li>
      ))}
    </ul>
  );
}
