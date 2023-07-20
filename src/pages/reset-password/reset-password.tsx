import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, FormEventHandler, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/app-header/app-header';
import { useForm } from '../../services/hooks';
import { resetPassword } from '../../utils/burger-api';
import { HOME, LOGIN } from '../../utils/routes';
import s from '../login/login.module.css';

export const ResetPasswordPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state?.isTokenSent) {
      navigate('/forgot-password');
    }
  }, [location, navigate]);
  const { values, setValues, handleChange } = useForm({
    token: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    resetPassword({
      token: values.token,
      password: values.password,
    })
      .then((res) => {
        if (res.success) {
          setSuccessMessage(res.message);
          setValues((state) => ({
            ...state,
            token: '',
            password: '',
          }));
          navigate(HOME);
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
        <form
          onSubmit={onSubmit}
          className={s.form}
        >
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <PasswordInput
            value={values.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Input
            placeholder="Введите код из письма"
            name="token"
            value={values.token}
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
          {successMessage && (
            <p className="text text_type_main-default text_color_inactive">
              {successMessage}
            </p>
          )}
        </form>
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
};
