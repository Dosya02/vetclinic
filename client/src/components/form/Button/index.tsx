import { FC } from 'react';
import clsx from 'clsx';

interface Props {
  text: string;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: VoidFunction;
  isDisabled?: boolean;
  isReverse?: boolean;
  border?: 'default' | 'rounded';
}

export const Button: FC<Props> = ({
                                    text,
                                    className = '',
                                    type = 'button',
                                    onClick,
                                    isDisabled = false,
                                    isReverse = false,
                                    border = 'rounded',
                                  }) => (
  <button
    className={clsx(
      'c-button',
      border === 'rounded' && 'c-button--rounded',
      isReverse && 'c-button--reverse',
      className,
    )}
    type={type}
    onClick={onClick}
    disabled={isDisabled}
  >{text}</button>
);