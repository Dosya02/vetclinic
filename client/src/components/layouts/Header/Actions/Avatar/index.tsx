import { FC } from 'react';
import { Avatar } from '@components';
import { useAppDispatch } from '@store/hooks';
import { logout } from '@store/reducers';

interface Props {
  image?: string;
}

export const HeaderActionsAvatar: FC<Props> = ({ image }) => {
  const dispatch = useAppDispatch();

  return (
    <span onClick={() => dispatch(logout())}>
      <Avatar
        className="c-header__avatar"
        image={image}
      />
    </span>
  );
};