import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  NAV_ITEMS_ADMIN,
  NAV_ITEMS_CLIENT,
  NAV_ITEMS_VET,
  USER_ROLES,
} from '@constants';
import { scrollToHashElement } from '@helpers';
import { useAppSelector } from '@store/hooks';

export const HeaderNav: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useAppSelector(state => state.authReducer);

  const role = userInfo?.role || USER_ROLES.CLIENT;
  const isAdmin = role === USER_ROLES.ADMIN;
  const isVet = role === USER_ROLES.VET;

  let navItems;

  switch (role) {
    case USER_ROLES.CLIENT:
      navItems = NAV_ITEMS_CLIENT;
      break;
    case USER_ROLES.ADMIN:
      navItems = NAV_ITEMS_ADMIN;
      break;
    case USER_ROLES.VET:
      navItems = NAV_ITEMS_VET;
      break;
    default:
      navItems = NAV_ITEMS_CLIENT;
  }

  const handleClick = (item: { id: string; label: string; href?: string }) => {
    if ((
          isAdmin || isVet
        ) && item.href) {
      navigate(item.href);
    } else {
      scrollToHashElement(item.id, navigate, location);
    }
  };

  return (
    <nav className="c-nav">
      <ul className="c-nav__list">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="c-nav__item"
            onClick={() => handleClick(item)}
          >
            <span className="c-nav__label">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};