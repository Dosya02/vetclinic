import { FC } from 'react';
import clsx from 'clsx';
import { Avatar } from '@components';
import {
  DROPDOWN_VARIANT,
  DropdownOption,
  DropdownVariantType,
} from '@constants';

interface Props {
  isOpen: boolean;
  selected?: DropdownOption;
  variant: DropdownVariantType;
  options: DropdownOption[];
  handleSelect: (option: DropdownOption) => void;
  rounded: boolean;
}

export const DropdownOptions: FC<Props> = ({
  isOpen,
  selected,
  variant,
  options,
  handleSelect,
  rounded,
}) => {
  const optionsClass = clsx(
    'c-dropdown__options',
    `c-dropdown__options--${variant}`,
    isOpen && 'c-dropdown__options--active',
    rounded && 'c-dropdown__options--rounded',
  );

  const renderDropdownItem = (option: DropdownOption) => {
    switch (variant) {
      case DROPDOWN_VARIANT.IMAGE:
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
      default:
        return <span>{option.label}</span>;
    }
  };

  return (
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
        );
      })}
    </ul>
  );
};