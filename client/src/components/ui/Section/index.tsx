import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  alternate?: boolean;
};

export const Section: FC<Props> = ({
                                     children,
                                     className = '',
                                     id,
                                     alternate = false,
                                   }) => (
  <section
    id={id}
    className={clsx(
      'c-section',
      alternate && 'c-section--alternate',
      className,
    )}
  >
    {children}
  </section>
);