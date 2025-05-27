import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '@constants';
import { APP_ROUTES } from '@routes';

export const HeaderNav: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleClick = (id: string) => {
    if (location.pathname !== APP_ROUTES.HOME) {
      navigate(APP_ROUTES.HOME, { state: { scrollToId: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <nav className="c-nav">
      <ul className="c-nav__list">
        {NAV_ITEMS.map(({ id, label }) =>
                         <li
                           key={id}
                           className="c-nav__item u-cursor-pointer"
                           onClick={() => handleClick(id)}
                         >
														<span className="c-nav__label">
															{label}
														</span>
                         </li>,
        )}
      </ul>
    </nav>
  );
};