import { Location, NavigateFunction } from 'react-router-dom';
import { APP_ROUTES } from '@routes';

export function scrollToHashElement(
  id: string,
  navigate: NavigateFunction,
  location: Location,
) {
  if (location.pathname !== APP_ROUTES.HOME) {
    navigate(APP_ROUTES.HOME, { state: { scrollToId: id } });
  } else {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}