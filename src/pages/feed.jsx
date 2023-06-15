import React from 'react';
import { AppHeader } from '../components/app-header/app-header';
import OrderCard from '../components/order-card/order-card';
import s from './feed.module.css';
import data from '../utils/data.json';
import Stats from '../components/stats/stats';
import { useNavigate } from 'react-router-dom';

export default function FeedPage() {
  const navigate = useNavigate();
  const handleOpenFeedModal = (orderNumber) => {
    navigate(`/feed/${orderNumber}`, { state: { isModal: true } });
  };
  return (
    <>
      <AppHeader />
      <main className={s.feed + ' mt-10'}>
        <p className="text text_type_main-large">Лента заказов</p>
        <div className={s.columns + ' mt-5'}>
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
          <Stats />
        </div>
      </main>
    </>
  );
}
