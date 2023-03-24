import {
  Counter,
  CurrencyIcon,
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import s from './burger-ingredients.module.css';
import bun1 from '../../images/ingridients/bun-01.png';
import bun2 from '../../images/ingridients/bun-02.png';
import souce1 from '../../images/ingridients/sauce-01.png';
import souce2 from '../../images/ingridients/sauce-02.png';
import souce3 from '../../images/ingridients/sauce-03.png';
import souce4 from '../../images/ingridients/sauce-04.png';

function BurgerIngredients() {
  const [current, setCurrent] = useState('one');
  return (
    <div className={s.container + ' mt-10'}>
      <h1 className={s.title + ' text text_type_main-large mt-10'}>
        Соберите бургер
      </h1>
      <div className="mt-5">
        <div className={s.tabs + ' mt-5'}>
          <Tab
            value="one"
            active={current === 'one'}
            onClick={setCurrent}
          >
            Булки
          </Tab>
          <Tab
            value="two"
            active={current === 'two'}
            onClick={setCurrent}
          >
            Соусы
          </Tab>
          <Tab
            value="three"
            active={current === 'three'}
            onClick={setCurrent}
          >
            Начинки
          </Tab>
        </div>
        <div className={s.ingridients}>
          <div className="mt-10">
            <h2 className="text text_type_main-medium">Булки</h2>
            <ul className={s.ingridient_items}>
              <li>
                <div className={s.ingridient_item}>
                  <img
                    src={bun2}
                    alt="Краторная булка N-200i"
                  />
                  <div
                    className={
                      s.price + ' text text_type_digits-default mb-1 mt-1'
                    }
                  >
                    20
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">
                    Краторная булка N-200i
                  </p>
                  <Counter
                    count={1}
                    size="default"
                    extraClass="m-1"
                  />
                </div>
              </li>
              <li>
                <div className={s.ingridient_item}>
                  <img
                    src={bun1}
                    alt="Флюоресцентная булка R2-D3"
                  />
                  <div
                    className={
                      s.price + ' text text_type_digits-default mb-1 mt-1'
                    }
                  >
                    20
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">
                    Флюоресцентная булка R2-D3
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-10">
            <h2 className="text text_type_main-medium">Соусы</h2>
            <ul className={s.ingridient_items}>
              <li>
                <div className={s.ingridient_item}>
                  <img
                    src={souce2}
                    alt="Соус Spicy-X"
                  />
                  <div
                    className={
                      s.price + ' text text_type_digits-default mb-1 mt-1'
                    }
                  >
                    30
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">Соус Spicy-X</p>
                </div>
              </li>
              <li>
                <div className={s.ingridient_item}>
                  <img
                    src={souce4}
                    alt="Соус фирменный Space Sauce"
                  />
                  <div
                    className={
                      s.price + ' text text_type_digits-default mb-1 mt-1'
                    }
                  >
                    30
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">
                    Соус фирменный Space Sauce
                  </p>
                </div>
              </li>
              <li>
                <div className={s.ingridient_item}>
                  <img
                    src={souce3}
                    alt="Соус традиционный галактический"
                  />
                  <div
                    className={
                      s.price + ' text text_type_digits-default mb-1 mt-1'
                    }
                  >
                    30
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">
                    Соус традиционный галактический
                  </p>
                  <Counter
                    count={1}
                    size="default"
                    extraClass="m-1"
                  />
                </div>
              </li>
              <li>
                <div className={s.ingridient_item}>
                  <img
                    src={souce1}
                    alt="Соус с шипами Антарианского плоскоходца"
                  />
                  <div
                    className={
                      s.price + ' text text_type_digits-default mb-1 mt-1'
                    }
                  >
                    30
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className="text text_type_main-default">
                    Соус с шипами Антарианского плоскоходца
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerIngredients;
