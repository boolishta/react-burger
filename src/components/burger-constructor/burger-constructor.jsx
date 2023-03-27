import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.css';
import bun2 from '../../images/ingridients/bun-02.png';
import souce3 from '../../images/ingridients/sauce-03.png';
import meat2 from '../../images/ingridients/meat-02.png';
import sp1 from '../../images/ingridients/sp-01.png';
import mineralRings from '../../images/ingridients/mineral-rings.png';
import Price from '../price/price';

export function BurgerConstructor() {
  return (
    <form>
      <ul className={s.elements}>
        <li className={s.element}>
          <ConstructorElement
            extraClass={s.constructorElement}
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={20}
            thumbnail={bun2}
          />
        </li>
        <li className={s.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            extraClass={s.constructorElement}
            text="Соус традиционный галактический"
            price={30}
            thumbnail={souce3}
          />
        </li>
        <li className={s.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            extraClass={s.constructorElement}
            text="Мясо бессмертных моллюсков Protostomia"
            price={300}
            thumbnail={meat2}
          />
        </li>
        <li className={s.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            extraClass={s.constructorElement}
            text="Плоды Фалленианского дерева"
            price={80}
            thumbnail={sp1}
          />
        </li>
        <li className={s.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            extraClass={s.constructorElement}
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail={mineralRings}
          />
        </li>
        <li className={s.element}>
          <DragIcon type="primary" />
          <ConstructorElement
            extraClass={s.constructorElement}
            text="Хрустящие минеральные кольца"
            price={80}
            thumbnail={mineralRings}
          />
        </li>
        <li className={s.element}>
          <ConstructorElement
            extraClass={s.constructorElement}
            text="Краторная булка N-200i (низ)"
            price={20}
            thumbnail={mineralRings}
            type="bottom"
            isLocked={true}
          />
        </li>
      </ul>
      <div className={s.info}>
        <Price />
        <Button
          htmlType="submit"
          type="primary"
        >
          Оформить заказ
        </Button>
      </div>
    </form>
  );
}
