import { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface Props {
  to: string;
  text: string;
  className?: string;
}

export const NavToText: FC<Props> = ({ to, text, className = '' }) => (
  <Link className={clsx(className)} to={to}>{text}</Link>
);