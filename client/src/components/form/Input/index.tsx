import { ChangeEvent, FC } from 'react';
import { ErrorMessage } from '@components';
import clsx from 'clsx';

interface Props {
  placeholder: string;
  label?: string;
  value: string;
  type: 'auth' | 'appointment' | 'appointment-with-label' | 'profile' | 'with-label';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  disabled?: boolean;
}

export const Input: FC<Props> = ({
                                   placeholder,
                                   label = '',
                                   value,
                                   type = 'auth',
                                   onChange,
                                   errorMessage,
                                   disabled = false,
                                 }) => (
  <div className="c-input">
    <div className="c-input__wrapper">
      {label &&
       <label className={clsx(
         'c-input__label',
       type === 'appointment-with-label' &&
       'c-input__label--appointment-with-label',
       type === 'with-label' && 'c-input__label--with-label',
       )}>{label}</label>
      }
      <input
        className={clsx(
          'c-input__input',
          type === 'auth' && 'c-input__input--auth',
          type === 'appointment' && 'c-input__input--appointment',
          type === 'appointment-with-label' &&
          'c-input__input--appointment-with-label',
          type === 'profile' && 'c-input__input--profile',
          type === 'with-label' && 'c-input__input--with-label',
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
    {errorMessage && <ErrorMessage message={errorMessage}/>}
  </div>
);