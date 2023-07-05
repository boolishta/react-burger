import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderCard } from '../order-card/order-card';
import { IHistoryOrders } from '../orders-history/orders-history';
import s from './orders.module.css';

interface IOrdersProps {
  orders: IHistoryOrders[];
}

export const Orders: FC<IOrdersProps> = ({ orders }) => {
  const navigate = useNavigate();
  const handleOpenFeedModal = (orderNumber: number) => {
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
};
