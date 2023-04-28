import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.css';
import Price from '../price/price';
import { useMemo, useState } from 'react';
import { OrderDetails } from '../order-details/order-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { orderCheckout } from '../../services/actions/store';

export function BurgerConstructor() {
  const { ingredients } = useSelector((state) => state.store);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => setVisible(false);
  const modal = () => (
    <Modal handleCloseModal={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );
  const bun = useMemo(() => {
    return ingredients.find((item) => item.type === 'bun');
  }, [ingredients]);
  const handleClick = () => {
    const data = ingredients.map((item) => item._id);
    dispatch(
      orderCheckout({
        ingredients: data,
      })
    );
    handleOpenModal();
  };

  return (
    <>
      <div>
        <ul className={s.elements + ' custom-scroll'}>
          {bun && (
            <li className={s.element}>
              <ConstructorElement
                extraClass={s.constructorElement}
                text={bun.name + ' (верх)'}
                price={bun.price}
                thumbnail={bun.image}
                isLocked={true}
                type="top"
              />
            </li>
          )}
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
          {bun && (
            <li className={s.element}>
              <ConstructorElement
                extraClass={s.constructorElement}
                text={bun.name + ' (низ)'}
                price={bun.price}
                thumbnail={bun.image}
                isLocked={true}
                type="bottom"
              />
            </li>
          )}
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
