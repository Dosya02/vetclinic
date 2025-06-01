import { FC, useEffect, useRef, useState } from 'react';
import { Avatar, Icon } from '@components';
import { ICONS } from '@constants';
import clsx from 'clsx';

export interface DropdownOption {
  value: string;
  label: string;
  imageUrl?: string;
}

interface Props {
  options: DropdownOption[];
  selected: DropdownOption | null;
  onSelect: (value: string) => void;
  placeholder?: string;
  variant?: 'default' | 'image' | 'compact' | 'label';
}

export const Dropdown: FC<Props> = ({
  options,
  selected,
  onSelect,
  placeholder = 'Выберите...',
  variant = 'default',
}) => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (option: DropdownOption) => {
    onSelect(option.value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerClass = `c-dropdown__trigger c-dropdown__trigger--${variant}`;
  const contentClass = `c-dropdown__content c-dropdown__content--${variant}`;
  const contentTextClass = `c-dropdown__content-text c-dropdown__content-text--${variant}`;
  const contentLabelClass = `c-dropdown__content-label c-dropdown__content-label--${variant}`;
  const optionsClass = clsx(
    'c-dropdown__options',
    `c-dropdown__options--${variant}`,
    isOpen && 'c-dropdown__options--active',
  );

  const renderDropdownContent = () => {
    if (variant === 'image') {
      return (
        <>
          <Avatar
            className="c-dropdown__content-image"
            type="pet"
            image={selected?.imageUrl}
          />
          <span className={contentTextClass}>
            {selected?.label ?? placeholder}
          </span>
          <Icon className="c-dropdown__content-icon" name={ICONS.ARROW_DOWN} />
        </>
      );
    }

    if (variant === 'compact') {
      return (
        <span className={contentTextClass}>
          {selected?.label ?? placeholder}
        </span>
      );
    }

    if (variant === 'label') {
      return (
        <>
          <span className={contentLabelClass}>
            {placeholder}
          </span>
          <span className={contentTextClass}>
            {selected?.label ?? 'Выберите услугу'}
          </span>
        </>
      );
    }

    return (
      <>
        <span className={contentTextClass}>
          {selected?.label ?? placeholder}
        </span>
        <Icon className="c-dropdown__content-icon" name={ICONS.ARROW_DOWN} />
      </>
    );
  }

  const renderDropdownItem = (option: DropdownOption) => {
    if (variant === 'image') {
      return (
        <>
          <Avatar
            className="c-dropdown__option-image"
            type="pet"
            image={option.imageUrl}
          />
          <span>{option.label}</span>
        </>
      );
    }

    return (
      <span>{option.label}</span>
    );
  }

  return (
    <div className="c-dropdown" ref={dropdownRef}>
      <button className={triggerClass} onClick={toggleDropdown}>
        <div className={contentClass}>
          {renderDropdownContent()}
        </div>
      </button>
      <ul className={optionsClass}>
        {options.map((option) => {
          const isSelected = selected?.value === option.value;
          const optionClass = clsx(
            'c-dropdown__option',
            `c-dropdown__option--${variant}`,
            isSelected && 'c-dropdown__option--active',
          );
          return (
            <li
              key={option.value}
              className={optionClass}
              onClick={() => handleSelect(option)}
            >
              {renderDropdownItem(option)}
            </li>
          )
        })}
      </ul>
    </div>
  );
}