import { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Icon } from '@components';
import { ICONS } from '@constants';
import { useBoolean, useLogout } from '@hooks';
import { APP_ROUTES } from '@routes';
import clsx from 'clsx';

interface Props {
  image?: string;
}

export const HeaderActionsAvatar: FC<Props> = ({ image }) => {
  const menu = useBoolean(false);
  const ref = useRef<HTMLDivElement>(null);

  const { logout } = useLogout();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        menu.setFalse();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="c-header-avatar" ref={ref}>
      <div onClick={menu.toggle}>
        <Avatar
          className="c-header-avatar__avatar"
          image={image}
        />
      </div>
      <ul className={clsx('c-header-avatar__menu', menu.value && 'active')}>
        <li className="c-header-avatar__menu-item">
          <Link
            className="c-header-avatar__menu-link c-header-avatar__menu-link--user"
            onClick={menu.toggle}
            to={APP_ROUTES.PROFILE_ACCOUNT_DETAILS}
          >
            <Icon
              className="c-header-avatar__menu-icon"
              name={ICONS.USER}
            />
            Go to Profile
          </Link>
        </li>
        <li className="c-header-avatar__menu-item">
          <div
            className="c-header-avatar__menu-link c-header-avatar__menu-link--exit"
            onClick={logout}
          >
            <Icon
              className="c-header-avatar__menu-icon"
              name={ICONS.EXIT}
            />
            Exit
          </div>
        </li>
      </ul>
    </div>
  );
};