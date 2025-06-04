import { FC, useEffect, useRef, useState } from 'react';
import {
  DROPDOWN_VARIANT,
  DropdownOption,
  DropdownVariantType,
} from '@constants';
import { DropdownOptions } from './Options';
import { DropdownTrigger } from './Trigger';

interface Props {
  options: DropdownOption[];
  selected: DropdownOption | null;
  onSelect: (value: string) => void;
  placeholder?: string;
  variant?: DropdownVariantType;
  rounded?: boolean;
}

export const Dropdown: FC<Props> = ({
  options,
  selected,
  onSelect,
  placeholder = 'Выберите',
  variant = DROPDOWN_VARIANT.DEFAULT,
  rounded = false,
}) => {
  const [isOpen, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (option: DropdownOption) => {
    onSelect(option.value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="c-dropdown" ref={ref}>
      <DropdownTrigger
        isActive={isOpen}
        selected={selected}
        variant={variant}
        onClick={toggleDropdown}
        placeholder={placeholder}
        rounded={rounded}
      />
      <DropdownOptions
        isOpen={isOpen}
        selected={selected}
        variant={variant}
        options={options}
        handleSelect={handleSelect}
        rounded={rounded}
      />
    </div>
  );
};