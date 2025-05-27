import { FC, useRef, useState } from 'react';
import { Icon } from '@components';
import { ICONS } from '@constants';
import clsx from 'clsx';

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
                                      placeholder = '',
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
         <span className="c-dropdown__select-placeholder">{placeholder}</span>
        }
        {value &&
         <div className="c-dropdown__select-value">
           <img src={value.imageUrl} alt=""/>
           <span>{value.name}</span>
         </div>
        }
        {type !== 'compact' &&
         <Icon className="c-dropdown__select-icon" name={ICONS.ARROW_DOWN}/>
        }
      </div>
      <ul className="c-dropdown__options">
      
      </ul>
    </div>
  );
};