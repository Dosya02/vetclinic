import { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setLanguage } from '@store/reducers';
import styles from './ChangeLanguage.module.css';

const options = [
  { label: 'рус', value: 'ru' },
  { label: 'қаз', value: 'kz' },
  { label: 'eng', value: 'en' },
];

export const ChangeLanguage: FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const { language } = useAppSelector(state => state.languageReducer);
  const dispatch = useAppDispatch();
  
  const handleSelect = (langValue: string) => {
    dispatch(setLanguage(langValue));
    setOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.control} onClick={() => setOpen(!open)}>
				<span className={styles.value}>
					{options.find(option => option.value === language)?.label || 'рус'}
				</span>
      </div>
      {open &&
        <ul className={styles.options}>
          {options.map((option, index) => (
            <li
              key={index}
              className={`
								${styles.option}
								${option.value === language && styles.selected}
							`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};