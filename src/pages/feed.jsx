import React, { useEffect } from 'react';
import { AppHeader } from '../components/app-header/app-header';
import s from './feed.module.css';
import Stats from '../components/stats/stats';
import Feeds from '../components/feeds/feeds';
import { useDispatch } from 'react-redux';
import { WS_CONNECTION_START } from '../redux/actions';

export default function FeedPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
    });
  }, [dispatch]);
  return (
    <>
      <AppHeader />
      <main className={s.feed + ' mt-10'}>
        <p className="text text_type_main-large">Лента заказов</p>
        <div className={s.columns + ' mt-5'}>
          <Feeds />
          <Stats />
        </div>
      </main>
    </>
  );
}
