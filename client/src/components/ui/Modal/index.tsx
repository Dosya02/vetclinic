import { FC, ReactNode } from 'react';
import { useBodyScrollLock } from '@hooks';

interface Props {
  active: boolean;
  children: ReactNode;
  variant?: 'light' | 'dark';
}

export const Modal: FC<Props> = ({ active, children, variant = 'dark' }) => {
  useBodyScrollLock(active);

  return (
    <div className={`c-modal ${active ? 'active' : ''} ${variant}`}>
      {children}
    </div>
  );
};