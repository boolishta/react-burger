import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/app-header/app-header';
import Error from '../components/error/error';
import { userRegister } from '../services/actions/user';
import { getUserSelector } from '../utils/selectors';
import s from './login.module.css?module';

export function RegisterPage() {
  const [formValues, setFormValues] = useState({
    email: 'batr.fly@yandex.ru',
    password: 'password',
    name: 'Username',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues(() => ({
      ...formValues,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error } = useSelector(getUserSelector);

  const onClick = () => {
    dispatch(
      userRegister({
        email: formValues.email,
        password: formValues.password,
        name: formValues.name,
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
          <p className="text text_type_main-medium">Регистрация</p>
          <Input
            placeholder="Имя"
            name="name"
            type="text"
            onChange={handleChange}
            value={formValues.name}
          />
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
            onClick={onClick}
          >
            Войти
          </Button>
          {error && <Error>{error}</Error>}
        </div>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{' '}
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
