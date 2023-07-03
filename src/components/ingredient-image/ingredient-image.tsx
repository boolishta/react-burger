import React, { FC } from 'react';
import s from './ingredient-image.module.css';

interface IIngredientImageProps {
  src: string;
}

export const IngredientImage: FC<IIngredientImageProps> = ({ src }) => {
  return (
    <picture className={s.picture}>
      <img
        src={src}
        alt=""
      />
    </picture>
  );
};
