import { FC } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@routes';

const UnauthorizedPage: FC = () => (
  <div>
    <h2>403 — Нет доступа</h2>
    <p>У вас нет прав для просмотра этой страницы.</p>
    <Link to={APP_ROUTES.HOME}>
      Вернуться на главную
    </Link>
  </div>
);

export default UnauthorizedPage;