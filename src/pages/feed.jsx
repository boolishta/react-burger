import React from 'react';
import { AppHeader } from '../components/app-header/app-header';
import s from './feed.module.css';
import Stats from '../components/stats/stats';
import Orders from '../components/orders/orders';

export default function FeedPage() {
  return (
    <>
      <AppHeader />
      <main className={s.feed + ' mt-10'}>
        <p className="text text_type_main-large">Лента заказов</p>
        <div className={s.columns + ' mt-5'}>
          <Orders />
          <Stats />
        </div>
      </main>
    </>
  );
}
