import React from 'react';
import s from './modal-overlay.module.css';
import PropTypes from 'prop-types';

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

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};
