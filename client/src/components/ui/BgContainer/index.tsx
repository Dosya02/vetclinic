import { FC, ReactNode } from 'react';

interface Props {
  image: string;
  className?: string;
  children: ReactNode;
  id?: string;
}

export const BgContainer: FC<Props> = ({
                                         image,
                                         className = '',
                                         children,
                                         id,
                                       }) => (
  <section
    className={`o-bg-container ${className}`}
    style={{ backgroundImage: `url(${image})` }}
    id={id}
  >{children}</section>
);