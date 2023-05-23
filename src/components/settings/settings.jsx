import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../utils/selectors';
import s from './settings.module.css?module';

export function Settings() {
  const { user } = useSelector(getUserSelector);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  useEffect(() => {
    setValues(() => ({
      name: user.name,
      email: user.email,
    }));
  }, [user, setValues]);
  const [disabledName, setDisabledName] = useState(true);
  const onChange = (event) => {
    const { name, value } = event.target;
    setValues(() => ({
      ...values,
      [name]: value,
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
        >
          Отмена
        </Button>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}
