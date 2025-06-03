import { ChangeEvent, FC, useState } from 'react';
import { ErrorMessage, Icon } from '@components';
import { ICONS } from '@constants';

interface Props {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string | null;
}

export const PasswordInput: FC<Props> = ({
  placeholder,
  value,
  onChange,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="c-input">
      <div className="c-input__password">
        <input
          className="c-input__field c-input__field--password"
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          className="c-input__toggler"
          type="button"
          onClick={toggleVisibility}
        >
          {showPassword
           ? <Icon
             className="c-input__toggler-icon"
             name={ICONS.SHOW_PASSWORD}
           />
           : <Icon
             className="c-input__toggler-icon"
             name={ICONS.HIDE_PASSWORD}
           />
          }
        </button>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage}/>}
    </div>
  );
};