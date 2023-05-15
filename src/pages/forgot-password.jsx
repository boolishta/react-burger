import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import s from './login.module.css?module';

export function ForgotPasswordPage() {
  const [formValues, setFormValues] = useState({
    code: '',
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
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <PasswordInput
            value={formValues.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Input
            placeholder="Введите код из письма"
            name="code"
            value={formValues.code}
            onChange={handleChange}
            type="text"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={s.button}
          >
            Сохранить
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
