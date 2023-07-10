import React, { FC, MouseEventHandler, ReactNode } from 'react';
import s from './modal-overlay.module.css';

interface IModalProps {
  children: ReactNode;
  handleCloseModal: () => void;
}

export const ModalOverlay: FC<IModalProps> = ({
  children,
  handleCloseModal,
}) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as Element;
    if (target.classList.contains(s.overlay)) {
      handleCloseModal();
    }
  };
  return (
    <div
      onClick={handleClick}
      className={s.overlay}
    >
      {children}
    </div>
  );
};
