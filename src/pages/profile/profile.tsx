import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/app-header/app-header';
import { userLogout } from '../../services/actions/user';
import { LOGIN, PROFILE_ORDERS, PROFILE } from '../../utils/routes';
import s from './profile.module.css';

export const ProfilePage: FC = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) => {
    const classes = ' text text_type_main-medium text_color_inactive';
    return isActive ? s.link + ' ' + s.link_active + classes : s.link + classes;
  };
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(userLogout());
    navigate(LOGIN);
  };
  const isAuth = !!localStorage.getItem('refreshToken');
  return isAuth ? (
    <>
      <AppHeader />
      <div className={s.profile}>
        <ul className={s.list}>
          <li>
            <NavLink
              end
              to={PROFILE}
              className={linkClasses}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to={PROFILE_ORDERS}
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
              onClick={logout}
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
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to={LOGIN} />
  );
};
