import React from 'react';
import PropType from 'prop-types';

export default function Error({ children }) {
  return (
    <p className="p-2 text text_type_main-default text_color_inactive">
      {children ? children : 'Что то пошло не так ('}
    </p>
  );
}
Error.propTypes = {
  children: PropType.node.isRequired,
};
