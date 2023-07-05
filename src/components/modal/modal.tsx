import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import s from './modal.module.css';

const modalRoot = document.getElementById('react-modals') as Element;

interface IModalProps {
  children: ReactNode;
  handleCloseModal: () => void;
}

export const Modal: FC<IModalProps> = ({ children, handleCloseModal }) => {
  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
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
};
