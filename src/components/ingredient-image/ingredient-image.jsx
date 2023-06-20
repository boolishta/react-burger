import React from 'react';
import s from './ingredient-image.module.css';
import PropType from 'prop-types';

export default function IngredientImage({ src }) {
  return (
    <picture className={s.picture}>
      <img
        src={src}
        alt=""
      />
    </picture>
  );
}

IngredientImage.propTypes = {
  src: PropType.string.isRequired,
};
