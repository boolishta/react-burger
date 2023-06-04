import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import s from './login.module.css?module';
import Error from '../components/error/error';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../services/actions/user';
import { getUserSelector } from '../utils/selectors';
import { FORGOT_PASSWORD, HOME, REGISTER } from '../utils/routes';

export function LoginPage() {
  const location = useLocation();
  const returnUrl = new URLSearchParams(location.search).get('returnUrl');
  const url = useMemo(() => (returnUrl ? returnUrl : HOME), [returnUrl]);
  const [formValues, setFormValues] = useState({
    email: 'batr.fly@yandex.ru',
    password: 'password',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, userLoginSuccess, userLogoutSuccess } =
    useSelector(getUserSelector);
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onClick = (event) => {
    event.preventDefault();
    dispatch(
      userLogin({
        email: formValues.email,
        password: formValues.password,
      })
    );
  };
  useEffect(() => {
    if (userLoginSuccess) {
      navigate(url);
    }
  }, [userLoginSuccess, navigate, userLogoutSuccess, url]);
  return (
    <>
      <AppHeader />
      <div className={s.login}>
        <div className={s.form}>
          <p className="text text_type_main-medium">Вход</p>
          <EmailInput
            value={formValues.email}
            placeholder="E-mail"
            type="email"
            name="email"
            onChange={onChange}
          />
          <PasswordInput
            value={formValues.password}
            name="password"
            placeholder="Password"
            onChange={onChange}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={s.button}
            onClick={onClick}
          >
            Войти
          </Button>
          {error && <Error>{error}</Error>}
        </div>
        <p
          className={
            s.register + ' text text_type_main-default text_color_inactive'
          }
        >
          Вы — новый пользователь?{' '}
          <Link
            className={s.link}
            to={REGISTER}
          >
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{' '}
          <Link
            className={s.link}
            to={FORGOT_PASSWORD}
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </>
  );
}
