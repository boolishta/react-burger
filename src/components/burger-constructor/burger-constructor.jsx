import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.css';
import Price from '../price/price';
import { ingredients } from '../../utils/data';

export function BurgerConstructor() {
  const computedConstructorElementType = (index) => {
    if (index === 0) {
      return 'top';
    } else if (index === ingredients.length - 1) {
      return 'bottom';
    }
    return null;
  };
  return (
    <form>
      <ul className={s.elements}>
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
          htmlType="submit"
          type="primary"
        >
          Оформить заказ
        </Button>
      </div>
    </form>
  );
}
