import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import s from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

export default function Modal({ children, handleCloseModal }) {
  useEffect(() => {
    const downHandler = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [handleCloseModal]);
  return createPortal(
    <ModalOverlay handleCloseModal={handleCloseModal}>
      <div className={s.modal}>
        {children}
        <div className={s.close}>
          <CloseIcon
            onClick={handleCloseModal}
            type="primary"
          />
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};
