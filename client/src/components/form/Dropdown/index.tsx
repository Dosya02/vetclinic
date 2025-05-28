// libraries
import { FC, useRef, useState } from 'react';
import clsx from 'clsx';
// components
import { Avatar, Icon } from '@components';
// constants
import { ICONS } from '@constants';

type OptionType = {
  name: string;
  imageUrl?: string;
}

interface Props {
  type: 'default' | 'with-image' | 'compact';
  options: OptionType[];
  value: OptionType;
  placeholder?: string;
}

export const Dropdown: FC<Props> = ({
  type,
  options,
  value,
  placeholder = 'Выберите',
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={clsx(
        'c-dropdown',
        type === 'with-image' && 'c-dropdown--with-image',
        type === 'compact' && 'c-dropdown--compact',
      )}
      ref={ref}
    >
      <div className="c-dropdown__select" onClick={() => setOpen(!open)}>
        {!value && placeholder &&
          <span className="c-dropdown__select-placeholder">{placeholder}
          </span>
        }
        {value && type !== 'with-image' &&
          <div className="c-dropdown__select-value">
            <span>{value.name}</span>
          </div>
        }
        {value && type === 'with-image' &&
          <div className="c-dropdown__select-value">
            <Avatar
              className="c-dropdown__select-image"
              type='pet'
              image={value.imageUrl}
            />
            <span>{value.name}</span>
          </div>
        }
        {type !== 'compact' &&
          <Icon className="c-dropdown__select-icon" name={ICONS.ARROW_DOWN} />
        }
      </div>
      <ul className="c-dropdown__options">

      </ul>
    </div>
  );
};