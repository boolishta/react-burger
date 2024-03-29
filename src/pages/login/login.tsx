import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, FormEventHandler, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/app-header/app-header';
import s from './login.module.css';
import { Error } from '../../components/error/error';
import { clearUserErrorAction, userLogin } from '../../services/actions/user';
import {
  getUserErrorSelector,
  getUserLogoutSuccessSelector,
  getUserSuccessLoginSelector,
} from '../../services/selectors/selectors';
import { FORGOT_PASSWORD, HOME, REGISTER } from '../../utils/routes';
import { useDispatch, useForm, useSelector } from '../../services/hooks';

export const LoginPage: FC = () => {
  const location = useLocation();
  const returnUrl = new URLSearchParams(location.search).get('returnUrl');
  const url = useMemo(() => (returnUrl ? returnUrl : HOME), [returnUrl]);
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogoutSuccess = useSelector(getUserLogoutSuccessSelector);
  const error = useSelector(getUserErrorSelector);
  const userLoginSuccess = useSelector(getUserSuccessLoginSelector);
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
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
    dispatch(clearUserErrorAction());
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
};
