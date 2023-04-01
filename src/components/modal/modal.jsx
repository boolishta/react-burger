import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import s from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

export default function Modal({ children, handleClick }) {
  return createPortal(
    <ModalOverlay>
      <div className={s.modal}>
        {children}
        <div className={s.close}>
          <CloseIcon
            onClick={() => handleClick()}
            type="primary"
          />
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
}
