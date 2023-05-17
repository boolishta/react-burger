import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import { Settings } from '../components/settings/settings';
import s from './profile.module.css?module';

export function ProfilePage() {
  const linkClasses = ({ isActive }) => {
    const classes = ' text text_type_main-medium text_color_inactive';
    return isActive ? s.link + ' ' + s.link_active + classes : s.link + classes;
  };
  return (
    <>
      <AppHeader />
      <div className={s.profile}>
        <ul className={s.list}>
          <li>
            <NavLink
              to={'/profile'}
              className={linkClasses}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/history'}
              className={linkClasses}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/logout'}
              className={linkClasses}
            >
              Выход
            </NavLink>
          </li>
          <li className={s.info}>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </li>
        </ul>
        <Settings />
      </div>
    </>
  );
}
