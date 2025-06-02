import { FC } from 'react';
import { Icon } from '@components';
import { ANCHORS, ICONS } from '@constants';
import { scrollToHashElement } from '@helpers';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  variant?: 'light' | 'dark';
}

export const Logo: FC<Props> = ({ variant = 'light' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleClick = () => scrollToHashElement(
    ANCHORS.INTRO.id,
    navigate,
    location,
  );
  
  return (
    <div className="c-logo u-cursor-pointer" onClick={handleClick}>
      <Icon
        className="c-logo__icon"
        name={variant === 'light' ? ICONS.LOGO_LIGHT : ICONS.LOGO_DARK}
      />
      <h6 className={`
			c-logo__title
			${variant === 'dark' ? 'c-logo__title--dark' : 'c-logo__title--light'}
		`}>
        Добрый <br/>
        <span>Доктор Айболит</span>
      </h6>
    </div>
  );
};