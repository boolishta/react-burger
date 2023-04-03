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
  const buns = ingredients.filter((item) => item.type === 'bun');
  const handleClick = () => {
    handleOpenModal();
  };

  return (
    <>
      <div>
        <ul className={s.elements + ' custom-scroll'}>
          <li className={s.element}>
            <ConstructorElement
              extraClass={s.constructorElement}
              text={buns[0].name}
              price={buns[0].price}
              thumbnail={buns[0].image}
              isLocked={true}
              type="top"
            />
          </li>
          {ingredients.map(
            (ingredient) =>
              ingredient.type !== 'bun' && (
                <li
                  key={ingredient._id}
                  className={s.element}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    extraClass={s.constructorElement}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </li>
              )
          )}
          <li className={s.element}>
            <ConstructorElement
              extraClass={s.constructorElement}
              text={buns[1].name}
              price={buns[1].price}
              thumbnail={buns[1].image}
              isLocked={true}
              type="bottom"
            />
          </li>
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
