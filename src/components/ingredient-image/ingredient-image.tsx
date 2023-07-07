import React, { FC } from 'react';
import s from './ingredient-image.module.css';

interface IIngredientImageProps {
  src: string;
  name: string;
}

export const IngredientImage: FC<IIngredientImageProps> = ({ src, name }) => {
  return (
    <picture className={s.picture}>
      <img
        src={src}
        alt={name}
      />
    </picture>
  );
};
