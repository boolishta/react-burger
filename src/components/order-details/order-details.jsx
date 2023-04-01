import React from 'react';
import Modal from '../modal/modal';
import s from './order-details.module.css';
import doneImage from '../../images/done.jpg';
import PropTypes from 'prop-types';

export function OrderDetails({ handleCloseModal }) {
  return (
    <Modal handleCloseModal={handleCloseModal}>
      <div className={s.order}>
        <p className="text text_type_digits-large">034536</p>
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
    </Modal>
  );
}

OrderDetails.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};
