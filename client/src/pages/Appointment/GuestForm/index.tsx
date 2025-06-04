import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Dropdown, Input } from '@components';
import { DROPDOWN_VARIANT, DropdownOption, INPUT_VARIANT } from '@constants';

const options: DropdownOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

export const GuestForm: FC = () => {
  const [name, setName] = useState<string>('');
  const [selected, setSelected] = useState<DropdownOption | null>(null);

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleSelect = (value: string): void => {
    const found = options.find(opt => opt.value === value) || null;
    setSelected(found);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <form
      className="c-appointment__form c-appointment__form--guest"
      onSubmit={handleSubmit}
    >
      <Dropdown
        options={options}
        selected={selected}
        onSelect={handleSelect}
        variant={DROPDOWN_VARIANT.DEFAULT}
        placeholder="День"
      />
      <Input
        value={name}
        onChange={handleChangeName}
        variant={INPUT_VARIANT.DEFAULT}
        label="Дата и время"
        placeholder="Введите имя"
        errorMessage=""
      />
    </form>
  );
};