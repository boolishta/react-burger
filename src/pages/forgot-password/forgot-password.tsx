import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { ChangeEvent, FC, FormEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/app-header/app-header';
import s from '../login/login.module.css';
import { forgotPassword } from '../../utils/burger-api';
import { LOGIN } from '../../utils/routes';

export const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setEmail(e.target.value);
  };
  const navigate = useNavigate();
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    forgotPassword({
      email,
    })
      .then(() => {
        navigate('/reset-password', { state: { isTokenSent: true } });
      })
      .catch(() => setError('Ошибка!'));
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
          <EmailInput
            value={email}
            placeholder="Укажите e-mail"
            name="email"
            onChange={handleChange}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={s.button}
            disabled={!!error}
          >
            Восстановить
          </Button>
          {error && (
            <p className="text text_type_main-default text_color_inactive">
              {error}
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
