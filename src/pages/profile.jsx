import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import { Settings } from '../components/settings/settings';
import { userLogout } from '../services/actions/user';
import { PROFILE } from '../utils/routes';
import { getUserSelector } from '../utils/selectors';
import s from './profile.module.css?module';

export function ProfilePage() {
  const linkClasses = ({ isActive }) => {
    const classes = ' text text_type_main-medium text_color_inactive';
    return isActive ? s.link + ' ' + s.link_active + classes : s.link + classes;
  };
  const { message } = useSelector(getUserSelector);
  const [logoutMessage, setLogoutMessage] = useState();
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(userLogout());
  };
  useEffect(() => {
    setLogoutMessage(message);
  }, [message, setLogoutMessage]);
  return (
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
        {logoutMessage ? (
          <p className="text text_type_main-default text_color_inactive">
            {logoutMessage}
          </p>
        ) : (
          <Settings />
        )}
      </div>
    </>
  );
}
