import React from 'react';
import s from './modal-overlay.module.css';

export function ModalOverlay({ children }) {
  return <div className={s.overlay}>{children}</div>;
}
