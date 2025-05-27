import { FC } from 'react';
import { Image } from '@components';

interface Props {
  type?: 'user' | 'pet';
  image?: string;
}

export const Avatar: FC<Props> = ({
                                    type = 'user',
                                    image,
                                  }) => (
  <div className="c-avatar">
    <Image src={image!} alt="avatar"/>
  </div>
);