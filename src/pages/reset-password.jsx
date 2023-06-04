import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import { resetPassword } from '../utils/burger-api';
import { LOGIN } from '../utils/routes';
import s from './login.module.css?module';

export function ResetPasswordPage() {
  const [formValues, setFormValues] = useState({
    token: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues(() => ({
      ...formValues,
      [name]: value,
    }));
  };
  const onClick = () => {
    resetPassword({
      token: formValues.token,
      password: formValues.password,
    })
      .then((res) => {
        if (res.success) {
          setSuccessMessage(res.message);
        }
      })
      .catch((error) => {
        setSuccessMessage(error.message);
      });
  };

  return (
    <>
      <AppHeader />
      <div className={s.login}>
        <div className={s.form}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <PasswordInput
            value={formValues.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Input
            placeholder="Введите код из письма"
            name="token"
            value={formValues.token}
            onChange={handleChange}
            type="text"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={s.button}
            onClick={onClick}
          >
            Сохранить
          </Button>
          {successMessage && (
            <p className="text text_type_main-default text_color_inactive">
              {successMessage}
            </p>
          )}
        </div>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{' '}
          <Link
            className={s.link}
            to={LOGIN}
          >
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}
