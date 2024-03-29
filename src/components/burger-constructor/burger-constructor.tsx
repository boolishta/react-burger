import {
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.css';
import { Price } from '../price/price';
import { FC, useCallback, useEffect, useState } from 'react';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/constans';
import update from 'immutability-helper';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { v4 as uuidv4 } from 'uuid';
import {
  getBunSelector,
  getCurrentIngredientsSelector,
} from '../../services/selectors/selectors';
import { orderCheckout } from '../../services/actions/order';
import { ICurrentIngredient, IIngredient } from '../../interfaces/ingredient';
import {
  addBunAction,
  removeIngredientsAction,
} from '../../services/actions/ingredients';
import { useDispatch, useSelector } from '../../services/hooks';
import { addIngredientsAction } from '../../services/actions/ingredients';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getCurrentIngredientsSelector);
  const bun = useSelector(getBunSelector);
  const [draggableElements, setDraggableElements] = useState<
    ICurrentIngredient[]
  >([]);
  const [isDisableSubmit, setIsDisableSubmit] = useState(true);
  useEffect(() => {
    setDraggableElements(ingredients.filter((item) => item.type !== 'bun'));
  }, [ingredients]);
  useEffect(() => {
    if (bun) {
      setIsDisableSubmit(false);
    }
  }, [bun]);
  const [_, drop] = useDrop(() => ({
    accept: ItemTypes.INGREDIENT,
    drop: (item: { ingredient: IIngredient }) => {
      const { ingredient } = item;
      if (ingredient.type === 'bun') {
        return dispatch(addBunAction({ ...ingredient }));
      }
      return dispatch(
        addIngredientsAction({
          ...ingredient,
          uuid: uuidv4(),
        })
      );
    },
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
  const handleClick = () => {
    const data = ingredients.map((item) => item._id);
    dispatch(
      orderCheckout({
        ingredients: [...data, bun?._id, bun?._id],
      })
    );
    handleOpenModal();
  };
  const handleClose = useCallback(
    (uuid: string) => {
      dispatch(removeIngredientsAction(uuid));
    },
    [dispatch]
  );
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setDraggableElements((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);
  const renderDraggableElement = useCallback(
    (ingredient: ICurrentIngredient, index: number) => {
      return (
        <BurgerConstructorElement
          ingredient={ingredient}
          index={index}
          key={ingredient.uuid}
          handleClick={handleClose}
          moveCard={moveCard}
        />
      );
    },
    [handleClose, moveCard]
  );
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
            disabled={isDisableSubmit}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {visible && modal()}
    </>
  );
};
