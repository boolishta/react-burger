import {
  BurgerIcon,
  Button,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import s from './app-header.module.css';

export function AppHeader() {
  const navigate = useNavigate();
  return (
    <header className={s.header}>
      <nav className={s.container}>
        <ul className={s.list}>
          <li>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              extraClass={s.button + ' text text_color_inactive'}
              onClick={() => navigate('/')}
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
          onClick={() => navigate('/profile')}
        >
          <ProfileIcon type="secondary" />
          Личный кабинет
        </Button>
      </nav>
    </header>
  );
}
