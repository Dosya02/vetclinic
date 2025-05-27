import { ChangeEvent, FC } from 'react';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  isDisabled?: boolean;
}

export const Textarea: FC<Props> = ({
                                      value,
                                      onChange,
                                      placeholder = '',
                                      isDisabled = false,
                                    }) => (
  <div className="c-textarea">
    <textarea
      className="c-textarea__textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={isDisabled}
    />
  </div>
);