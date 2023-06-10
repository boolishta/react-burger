import {
  BurgerIcon,
  Button,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { HOME, PROFILE } from '../../utils/routes';
import s from './app-header.module.css';

export function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const homeLinkClasses = () => {
    return `${s.button} text text_color_inactive ${
      pathname === HOME ? s.activeButton : ''
    }`;
  };
  const profileLinkClasses = () => {
    return `${s.button} text text_color_inactive ${s.profile} ${
      pathname === PROFILE ? s.activeButton : ''
    }`;
  };
  return (
    <header className={s.header}>
      <nav className={s.container}>
        <ul className={s.list}>
          <li>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              extraClass={homeLinkClasses()}
              onClick={() => navigate(HOME)}
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
          extraClass={profileLinkClasses()}
          onClick={() => navigate(PROFILE)}
        >
          <ProfileIcon type="secondary" />
          Личный кабинет
        </Button>
      </nav>
    </header>
  );
}
