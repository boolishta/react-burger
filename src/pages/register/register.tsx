import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, FormEventHandler, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/app-header/app-header';
import { Error } from '../../components/error/error';
import { userRegister } from '../../services/actions/user';
import { LOGIN } from '../../utils/routes';
import { getUserSelector } from '../../services/selectors/selectors';
import s from '../login/login.module.css';
import { useForm } from '../../services/hooks';

export const RegisterPage: FC = () => {
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
  });
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { token, error } = useSelector(getUserSelector);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(
      userRegister({
        email: values.email,
        password: values.password,
        name: values.name,
      })
    );
  };
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <>
      <AppHeader />
      <div className={s.login}>
        <form
          onSubmit={onSubmit}
          className={s.form}
        >
          <p className="text text_type_main-medium">Регистрация</p>
          <Input
            placeholder="Имя"
            name="name"
            type="text"
            onChange={handleChange}
            value={values.name}
          />
          <EmailInput
            value={values.email}
            placeholder="E-mail"
            name="email"
            onChange={handleChange}
          />
          <PasswordInput
            value={values.password}
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
          {error && <Error>{error}</Error>}
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{' '}
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
