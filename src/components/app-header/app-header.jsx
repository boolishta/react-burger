import {
  BurgerIcon,
  Button,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.css';

function AppHeader() {
  return (
    <header className={s.header}>
      <ul className={s.list}>
        <li>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={s.button + ' text text_color_inactive'}
          >
            <BurgerIcon type="secondary" />
            Конструктор
          </Button>
        </li>
        <li>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={s.button + ' text text_color_inactive'}
          >
            <ListIcon type="secondary" />
            Лента заказов
          </Button>
        </li>
      </ul>
      <Logo />
      <Button
        htmlType="button"
        type="secondary"
        size="medium"
        extraClass={s.button + ' text text_color_inactive ' + s.profile}
      >
        <ProfileIcon type="secondary" />
        Личный кабинет
      </Button>
    </header>
  );
}

export default AppHeader;
