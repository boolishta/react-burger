import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import s from './login.module.css?module';
import Error from '../components/error/error';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../services/actions/user';
import { getUserSelector } from '../utils/selectors';

export function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: 'batr.fly@yandex.ru',
    password: 'password',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, success } = useSelector(getUserSelector);
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues(() => ({
      ...formValues,
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
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);
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
            to="/register"
          >
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{' '}
          <Link
            className={s.link}
            to="/forgot-password"
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </>
  );
}
