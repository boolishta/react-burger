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
import {
  ADD_INGREDIENTS,
  orderCheckout,
  REMOVE_INGREDIENTS,
} from '../../services/actions/store';
import { useDrop } from 'react-dnd';

export function BurgerConstructor() {
  const dispatch = useDispatch();
  const { currentIngredients: ingredients } = useSelector(
    (state) => state.store
  );
  const [{ isDrop, canDrop }, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item) =>
      dispatch({
        type: ADD_INGREDIENTS,
        id: item.id,
      }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));
  const [visible, setVisible] = useState(false);
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
  const handleClose = (ingredientId) => {
    dispatch({
      type: REMOVE_INGREDIENTS,
      id: ingredientId,
    });
  };

  return (
    <>
      <div>
        <ul
          ref={drop}
          className={s.elements + ' custom-scroll'}
        >
          <li>
            <p className="text text_type_main-default">
              перенесите сюда ваш заказ
            </p>
          </li>
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
            (ingredient, idx) =>
              ingredient.type !== 'bun' && (
                <li
                  key={ingredient._id + idx}
                  className={s.element}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    extraClass={s.constructorElement}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => handleClose(ingredient._id)}
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
