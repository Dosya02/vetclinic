import { FC } from 'react';
import { Avatar } from '@components';
import { useLogout } from '@hooks';

interface Props {
  image?: string;
}

export const HeaderActionsAvatar: FC<Props> = ({ image }) => {
  const { logout } = useLogout();

  return (
    <span onClick={logout}>
      <Avatar
        className="c-header__avatar"
        image={image}
      />
    </span>
  );
};