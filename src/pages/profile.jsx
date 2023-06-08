import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import { Settings } from '../components/settings/settings';
import { userLogout } from '../services/actions/user';
import { LOGIN, PROFILE } from '../utils/routes';
import { getUserSelector } from '../utils/selectors';
import s from './profile.module.css?module';

export function ProfilePage() {
  const linkClasses = ({ isActive }) => {
    const classes = ' text text_type_main-medium text_color_inactive';
    return isActive ? s.link + ' ' + s.link_active + classes : s.link + classes;
  };
  const { message } = useSelector(getUserSelector);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(userLogout());
  };
  const isAuth = !!localStorage.getItem('refreshToken');
  return isAuth ? (
    <>
      <AppHeader />
      <div className={s.profile}>
        <ul className={s.list}>
          <li>
            <NavLink
              to={PROFILE}
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
            <Button
              extraClass={'text text_type_main-medium text_color_inactive p-5'}
              type="secondary"
              size="large"
              onClick={onClick}
              htmlType="button"
            >
              Выход
            </Button>
          </li>
          <li className={s.info}>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </li>
        </ul>
        {message ? (
          <p className="text text_type_main-default text_color_inactive">
            {message}
          </p>
        ) : (
          <Settings />
        )}
      </div>
    </>
  ) : (
    <Navigate to={LOGIN} />
  );
}
