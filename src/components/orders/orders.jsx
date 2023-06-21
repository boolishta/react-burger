import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderCard from '../order-card/order-card';
import s from './orders.module.css?module';
import { ordersType } from '../../utils/prop-types';

export default function Orders({ orders }) {
  const navigate = useNavigate();
  const handleOpenFeedModal = (orderNumber) => {
    navigate(`/feed/${orderNumber}`, { state: { isModal: true } });
  };

  return (
    <ul className={s.orders + ' custom-scroll'}>
      {orders?.map((order) => (
        <li
          key={order.id}
          onClick={() => handleOpenFeedModal(order.number)}
        >
          <OrderCard
            orderNumber={order.number}
            date={order.date}
            name={order.name}
            ingredients={order.ingredients}
          />
        </li>
      ))}
    </ul>
  );
}

Orders.propTypes = {
  orders: ordersType,
};
