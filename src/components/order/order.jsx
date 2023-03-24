import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import s from './order.module.css';

export function Order() {
  return (
    <div className={s.order}>
      <BurgerIngredients />
    </div>
  );
}
