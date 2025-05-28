// libraries
import { FC } from 'react';
import clsx from 'clsx';
// components
import { Image } from '@components';
// static
import { PetAvatarImg, UserAvatarImg } from '@images';

interface Props {
  type?: 'user' | 'pet';
  image?: string;
  className?: string;
}

export const Avatar: FC<Props> = ({
  type = 'user',
  image,
  className = '',
}) => (
  <div className={clsx('u-circle', className)}>
    {type === 'user' &&
      <Image src={image ?? UserAvatarImg} alt="user avatar" />
    }
    {type === 'pet' &&
      <Image src={image ?? PetAvatarImg} alt="pet avatar" />
    }
  </div>
);