import { FC } from 'react';

interface Props {
  src: string;
  alt: string;
}

export const Image: FC<Props> = ({ src, alt }) => <img src={src} alt={alt}/>;