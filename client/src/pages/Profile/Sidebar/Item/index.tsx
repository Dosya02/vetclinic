import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@components';
import clsx from 'clsx';

interface Props {
  title: string;
  link: string;
  icon: string;
}

export const ProfileSidebarItem: FC<Props> = ({ title, link, icon }) => (
  <li className="c-profile__sidebar-item">
    <NavLink
      className={({ isActive }) => clsx(
        'c-profile__sidebar-link',
        isActive && 'active',
      )}
      to={link}
    >
      <div className="c-profile__sidebar-line"/>
      <Icon className="c-profile__sidebar-icon" name={icon}/>
      <h6 className="c-profile__sidebar-title">{title}</h6>
    </NavLink>
  </li>
);