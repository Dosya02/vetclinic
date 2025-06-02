import { FC } from 'react';
import clsx from 'clsx';

interface Props {
  text: string;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  reverse?: boolean;
  rounded?: boolean;
}

export const Button: FC<Props> = ({
                                    text,
                                    className = '',
                                    type = 'button',
                                    onClick,
                                    reverse = false,
                                    rounded = false,
                                  }) => {
  const buttonClass = clsx(
    'c-button',
    className,
    rounded && 'c-button--rounded',
    reverse && 'c-button--reverse',
  );
  
  return (
    <button
      className={buttonClass}
      type={type}
      onClick={onClick}
    >{text}</button>
  );
};