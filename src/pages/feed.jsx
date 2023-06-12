import React from 'react';
import { AppHeader } from '../components/app-header/app-header';
import OrderCard from '../components/order-card/order-card';
import s from './feed.module.css';
import data from '../utils/data.json';
import Stats from '../components/stats/stats';

export default function FeedPage() {
  return (
    <>
      <AppHeader />
      <main className={s.feed + ' mt-10'}>
        <p className="text text_type_main-large">Лента заказов</p>
        <div className={s.columns + ' mt-5'}>
          <ul className={s.orders + ' custom-scroll'}>
            {data.orders.map((order) => (
              <li key={order.id}>
                <OrderCard
                  orderId={order.id}
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
