import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import s from './login.module.css?module';

export function ResetPasswordPage() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    name: '',
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
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <EmailInput
            value={formValues.email}
            placeholder="Укажите e-mail"
            type="email"
            name="email"
            onChange={handleChange}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={s.button}
          >
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{' '}
          <Link
            className={s.link}
            to="/login"
          >
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}
