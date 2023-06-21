import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/app-header/app-header';
import s from './login.module.css?module';
import Error from '../../components/error/error';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_USER_ERROR, userLogin } from '../../redux/actions/user';
import { getUserSelector } from '../../redux/selectors/selectors';
import { FORGOT_PASSWORD, HOME, REGISTER } from '../../utils/routes';
import { useForm } from '../../hooks/useForm';

export function LoginPage() {
  const location = useLocation();
  const returnUrl = new URLSearchParams(location.search).get('returnUrl');
  const url = useMemo(() => (returnUrl ? returnUrl : HOME), [returnUrl]);
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, userLoginSuccess, userLogoutSuccess } =
    useSelector(getUserSelector);
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      userLogin({
        email: values.email,
        password: values.password,
      })
    );
  };
  useEffect(() => {
    if (userLoginSuccess) {
      navigate(url);
    }
    dispatch({
      type: CLEAR_USER_ERROR,
    });
  }, [userLoginSuccess, navigate, userLogoutSuccess, url, dispatch]);
  return (
    <>
      <AppHeader />
      <div className={s.login}>
        <form
          onSubmit={onSubmit}
          className={s.form}
        >
          <p className="text text_type_main-medium">Вход</p>
          <EmailInput
            value={values.email}
            placeholder="E-mail"
            type="email"
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
