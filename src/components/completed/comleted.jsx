import React from 'react';
import s from './completed.module.css';

export default function Completed({ extraClass, name, count }) {
  return (
    <div className={extraClass}>
      <p className="text text_type_main-medium">{name}</p>
      <p className={s.count + ' text text_type_digits-large'}>{count}</p>
    </div>
  );
}
