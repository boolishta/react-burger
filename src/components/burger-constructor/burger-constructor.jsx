import {
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.css';
import Price from '../price/price';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { OrderDetails } from '../order-details/order-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { orderCheckout } from '../../services/actions/store';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/constans';
import update from 'immutability-helper';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_INGREDIENTS,
  REMOVE_INGREDIENTS,
} from '../../services/actions/ingredients';
import { getIngredientsSelector } from '../../utils/selectors';

export function BurgerConstructor() {
  const dispatch = useDispatch();
  const { currentIngredients: ingredients } = useSelector(
    getIngredientsSelector
  );
  const [draggableElements, setDraggableElements] = useState([]);
  useEffect(() => {
    setDraggableElements(ingredients.filter((item) => item.type !== 'bun'));
  }, [ingredients]);
  const [{ isDrop, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.INGREDIENT,
    drop: (item) =>
      dispatch({
        type: ADD_INGREDIENTS,
        id: item.id,
        uuid: uuidv4(),
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
  const handleClose = (uuid) => {
    dispatch({
      type: REMOVE_INGREDIENTS,
      uuid,
    });
  };
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setDraggableElements((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);
  const renderDraggableElement = useCallback((ingredient, index) => {
    return (
      <BurgerConstructorElement
        ingredient={ingredient}
        index={index}
        key={ingredient.uuid}
        handleClick={handleClose}
        moveCard={moveCard}
      />
    );
  }, []);
  return (
    <>
      <div>
        <ul
          ref={drop}
          className={s.elements + ' custom-scroll'}
        >
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
          {draggableElements.map((ingredient, index) =>
            renderDraggableElement(ingredient, index)
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
