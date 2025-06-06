import { FC } from 'react';
import { APP_ROUTES } from '@routes';
import { ICONS } from '@constants';
import { ProfileSidebarItem } from '@pages/Profile/Sidebar/Item';

const sidebarItems = [
  {
    title: 'Личный кабинет',
    link: APP_ROUTES.PROFILE_ACCOUNT_DETAILS,
    icon: ICONS.USER,
  },
  {
    title: 'Карта питомца',
    link: APP_ROUTES.PROFILE_PETS,
    icon: ICONS.PET_CARD,
  },
  {
    title: 'Записи',
    link: APP_ROUTES.PROFILE_APPOINTMENTS,
    icon: ICONS.MEDICAL_RECEIPT,
  },
];

export const ProfileSidebar: FC = () => (
  <aside className="c-profile__sidebar">
    <ul className="c-profile__sidebar-list">
      {sidebarItems.map((item) =>
        <ProfileSidebarItem key={item.link} {...item} />,
      )}
    </ul>
  </aside>
);