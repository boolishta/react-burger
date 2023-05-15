import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import s from './login.module.css?module';

export function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues(() => ({
      ...formValues,
      [name]: value,
    }));
  };

  return (
    <>
      <AppHeader />
      <div className={s.login}>
        <form className={s.form}>
          <p className="text text_type_main-medium">Вход</p>
          <EmailInput
            value={formValues.email}
            placeholder="E-mail"
            type="email"
            name="email"
            onChange={handleChange}
          />
          <PasswordInput
            value={formValues.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={s.button}
          >
            Войти
          </Button>
        </form>
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
            to="/reset-password"
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </>
  );
}
