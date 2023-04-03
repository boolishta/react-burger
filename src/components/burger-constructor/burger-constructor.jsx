import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.css';
import Price from '../price/price';
import { ingredientsType } from '../../utils/prop-types';
import { useState } from 'react';
import { OrderDetails } from '../order-details/order-details';
import Modal from '../modal/modal';

export function BurgerConstructor({ ingredients }) {
  const [visible, setVisible] = useState(false);
  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => setVisible(false);
  const modal = () => (
    <Modal handleCloseModal={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );
  const computedConstructorElementType = (index) => {
    if (index === 0) {
      return 'top';
    } else if (index === ingredients.length - 1) {
      return 'bottom';
    }
    return null;
  };

  const handleClick = () => {
    handleOpenModal();
  };

  return (
    <>
      <div>
        <ul className={s.elements + ' custom-scroll'}>
          {ingredients.map((ingredient, index) => (
            <li
              key={ingredient._id}
              className={s.element}
            >
              {index > 0 && index < ingredients.length - 1 ? (
                <DragIcon type="primary" />
              ) : null}
              <ConstructorElement
                extraClass={s.constructorElement}
                isLocked={ingredient.type === 'bun'}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                type={computedConstructorElementType(index)}
              />
            </li>
          ))}
        </ul>
        <div className={s.info}>
          <Price />
          <Button
            htmlType="button"
            type="primary"
            onClick={handleClick}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {visible && modal()}
    </>
  );
}

BurgerConstructor.propTypes = {
  ingredients: ingredientsType,
};
