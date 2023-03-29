import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.css';
import Price from '../price/price';
import PropTypes from 'prop-types';

export function BurgerConstructor({ ingredients }) {
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

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};
