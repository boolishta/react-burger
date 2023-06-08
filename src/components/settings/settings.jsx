import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  refreshUserToken,
  updateUserData,
  userData,
} from '../../services/actions/user';
import { getUserSelector } from '../../utils/selectors';
import s from './settings.module.css?module';

export function Settings() {
  const dispatch = useDispatch();
  const { user, token } = useSelector(getUserSelector);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  useEffect(() => {
    setValues((state) => ({
      ...state,
      name: user ? user.name : '',
      email: user ? user.email : '',
    }));
  }, [user, setValues]);
  const refreshTokenValue = localStorage.getItem('refreshToken');
  useEffect(() => {
    if (token) {
      dispatch(userData(token));
    } else if (refreshTokenValue) {
      dispatch(refreshUserToken(refreshTokenValue));
    }
  }, [dispatch, token, refreshTokenValue]);
  const [disabledName, setDisabledName] = useState(true);
  const onChange = (event) => {
    const { name, value } = event.target;
    setValues(() => ({
      ...values,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    dispatch(
      updateUserData(token, {
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
  };
  const cancelEdit = () => {
    setValues((state) => ({
      ...state,
      name: user ? user.name : '',
      email: user ? user.email : '',
    }));
  };
  return (
    <div className={s.settings}>
      <Input
        placeholder="Имя"
        icon="EditIcon"
        value={values.name}
        name="name"
        onChange={onChange}
        disabled={disabledName}
        onIconClick={() => setDisabledName(false)}
        onBlur={() => setDisabledName(true)}
      />
      <EmailInput
        onChange={onChange}
        value={values.email}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
      />
      <PasswordInput
        onChange={onChange}
        value={values.password}
        name={'password'}
        icon="EditIcon"
      />
      <div className={s.actions}>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={cancelEdit}
        >
          Отмена
        </Button>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleSubmit}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}
