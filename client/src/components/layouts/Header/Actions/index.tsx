import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Icon } from '@components';
import { DROPDOWN_VARIANT, ICONS } from '@constants';
import { APP_ROUTES } from '@routes';
import { DropdownOption } from '@types';
import { useAppSelector } from '@store/hooks';
import { HeaderActionsAvatar } from './Avatar';

const languages: DropdownOption[] = [
  { value: 'ru', label: 'рус' },
  { value: 'kz', label: 'қаз' },
  { value: 'en', label: 'eng' },
];

export const HeaderActions: FC = () => {
  const { userInfo } = useAppSelector(state => state.authReducer);

  const [language, setLanguage] = useState<DropdownOption | null>(languages[0]);

  const handleChangeLanguage = (value: string): void => {
    const found = languages.find(option => option.value === value) || null;
    setLanguage(found);
  };

  return (
    <div className="c-header__actions">
      <Dropdown
        options={languages}
        selected={language}
        onSelect={handleChangeLanguage}
        variant={DROPDOWN_VARIANT.COMPACT}
      />
      {userInfo
       ? (
         <HeaderActionsAvatar image={userInfo.imageUrl}/>
       )
       : (
         <Link className="c-header__auth" to={APP_ROUTES.LOGIN}>
           <Icon
             className="c-header__auth-icon"
             name={ICONS.USER}
           />
         </Link>
       )
      }

    </div>
  );
};