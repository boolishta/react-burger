import React, { useContext } from 'react';
import s from './order-details.module.css';
import doneImage from '../../images/done.jpg';
import { DetailsContext } from '../../services/detailsContext';

export function OrderDetails() {
  const { order } = useContext(DetailsContext);
  return (
    <div className={s.order}>
      <p className="text text_type_digits-large">{order.number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img
        className={s.image}
        src={doneImage}
        alt=""
      />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className={s.colored + ' text text_type_main-default'}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
