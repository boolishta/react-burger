import React, { FC, ReactNode } from 'react';

interface IErrorProps {
  children?: ReactNode;
}

export const Error: FC<IErrorProps> = ({ children }) => {
  return (
    <p className="p-2 text text_type_main-default text_color_inactive">
      {children ? children : 'Что то пошло не так ('}
    </p>
  );
};
