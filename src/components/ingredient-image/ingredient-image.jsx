import React from 'react';
import s from './ingredient-image.module.css';

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

// TODO: propsType
