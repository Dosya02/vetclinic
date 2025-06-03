import { ChangeEvent, ClipboardEvent, FC, KeyboardEvent } from 'react';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
}

export const PinInput: FC<Props> = ({
  value,
  onChange,
  onKeyDown,
  onPaste,
}) => (
  <input
    className="c-input__field c-input__field--pin c-input--pin"
    type="text"
    maxLength={1}
    inputMode="numeric"
    pattern="\d*"
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onPaste={onPaste}
  />
);