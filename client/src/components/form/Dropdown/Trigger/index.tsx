import { FC } from 'react';
import clsx from 'clsx';
import { Avatar, Icon } from '@components';
import {
  DROPDOWN_VARIANT,
  DropdownOption,
  DropdownVariantType,
  ICONS,
} from '@constants';

interface Props {
  isActive: boolean;
  selected?: DropdownOption;
  variant: DropdownVariantType;
  onClick: () => void;
  placeholder: string;
  rounded: boolean;
}

export const DropdownTrigger: FC<Props> = ({
  isActive,
  selected,
  variant,
  onClick,
  placeholder,
  rounded,
}) => {
  const triggerClass = clsx(
    'c-dropdown__trigger',
    `c-dropdown__trigger--${variant}`,
    isActive && 'c-dropdown__trigger--active',
    rounded && 'c-dropdown__trigger--rounded',
  );
  const contentClass = `c-dropdown__content c-dropdown__content--${variant}`;
  const contentTextClass = `c-dropdown__content-text c-dropdown__content-text--${variant}`;
  const contentLabelClass = `c-dropdown__content-label c-dropdown__content-label--${variant}`;

  const renderDropdownContent = () => {
    switch (variant) {
      case DROPDOWN_VARIANT.IMAGE:
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
            <Icon className="c-dropdown__content-icon" name={ICONS.ARROW_DOWN}/>
          </>
        );
      case DROPDOWN_VARIANT.COMPACT:
        return (
          <span className={contentTextClass}>
            {selected?.label ?? placeholder}
          </span>
        );
      case DROPDOWN_VARIANT.LABEL:
        return (
          <>
            <span className={contentLabelClass}>
              {placeholder}
            </span>
            <span className={contentTextClass}>
              {selected?.label ?? 'Выберите'}
            </span>
          </>
        );
      default:
        return (
          <>
            <span className={contentTextClass}>
              {selected?.label ?? placeholder}
            </span>
            <Icon className="c-dropdown__content-icon" name={ICONS.ARROW_DOWN}/>
          </>
        );
    }
  };

  return (
    <button className={triggerClass} onClick={onClick} type="button">
      <div className={contentClass}>
        {renderDropdownContent()}
      </div>
    </button>
  );
};