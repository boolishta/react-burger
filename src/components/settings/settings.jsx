import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { updateUserData, userData } from '../../services/actions/user';
import { getUserSelector } from '../../utils/selectors';
import s from './settings.module.css?module';

export function Settings() {
  const dispatch = useDispatch();
  const { user } = useSelector(getUserSelector);
  const { values, setValues, handleChange } = useForm({
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
  useEffect(() => {
    dispatch(userData());
  }, [dispatch]);
  const [disabledName, setDisabledName] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserData({
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
    <form
      onSubmit={handleSubmit}
      className={s.settings}
    >
      <Input
        placeholder="Имя"
        icon="EditIcon"
        value={values.name}
        name="name"
        onChange={handleChange}
        disabled={disabledName}
        onIconClick={() => setDisabledName(false)}
        onBlur={() => setDisabledName(true)}
      />
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
      />
      <PasswordInput
        onChange={handleChange}
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
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
}
