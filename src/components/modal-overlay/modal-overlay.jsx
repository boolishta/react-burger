import React, { useEffect } from 'react';
import s from './modal-overlay.module.css';

export function ModalOverlay({ children, handleCloseModal }) {
  const handleClick = (e) => {
    if (e.target.classList.contains(s.overlay)) {
      handleCloseModal();
    }
  };
  const downHandler = (e) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);
  return (
    <div
      onClick={handleClick}
      className={s.overlay}
    >
      {children}
    </div>
  );
}
