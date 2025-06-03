import { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface Props {
  to: string;
  text: string;
  className?: string;
  onClick?: () => void;
}

export const NavToText: FC<Props> = ({ to, text, className = '', onClick }) => (
  <Link className={clsx(className)} to={to} onClick={onClick}>{text}</Link>
);