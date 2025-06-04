import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '@components';
import { ADMIN_NAV_ITEMS } from '@constants';
import clsx from 'clsx';

export const AdminSidebar: FC = () => {
  return (
    <aside className="c-admin__sidebar">
      <div className="c-admin__logo">
        <Logo/>
      </div>
      <nav className="c-admin__nav">
        <ul className="c-admin__nav-list">
          {ADMIN_NAV_ITEMS.map((item) => (
            <li className="c-admin__nav-item" key={item.href}>
              <NavLink
                className={({ isActive }) => clsx(
                  'c-admin__nav-link',
                  `${isActive && 'active'}`,
                )}
                to={item.href}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};