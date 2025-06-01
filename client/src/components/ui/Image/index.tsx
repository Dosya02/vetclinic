import { FC } from 'react';
import clsx from 'clsx';

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

export const Image: FC<Props> = ({ src, alt, className = '' }) => (
  <img
    className={clsx(className)}
    src={src}
    alt={alt ?? ""}
    loading="lazy"
  />
);