import { ChangeEvent, FC } from 'react';
import { ErrorMessage } from '@components';
import { INPUT_VARIANT } from '@constants';
import { InputVariantType } from '@types';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  variant?: InputVariantType;
  label?: string;
  placeholder?: string;
  errorMessage: string | null;
}

export const Input: FC<Props> = ({
  value,
  onChange,
  variant = INPUT_VARIANT.DEFAULT,
  label,
  placeholder,
  errorMessage,
}) => {
  const inputClass = `c-input__field c-input__field--${variant}`;
  const labelClass = `c-input__label c-input__label--${variant}`;

  const renderInput = () => {
    switch (variant) {
      case INPUT_VARIANT.LABEL:
        return (
          <div className="c-input__row">
            {label && <span className={labelClass}>{label}</span>}
            <input
              className={inputClass}
              type="text"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
            />
          </div>
        );
      default:
        return (
          <input
            className={inputClass}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="c-input">
      {renderInput()}
      {errorMessage && <ErrorMessage message={errorMessage}/>}
    </div>
  );
};