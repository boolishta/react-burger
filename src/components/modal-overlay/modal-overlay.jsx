import React from 'react';
import s from './modal-overlay.module.css';

export function ModalOverlay({ children, handleCloseModal }) {
  const handleClick = (e) => {
    if (e.target.classList.contains(s.overlay)) {
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
}
