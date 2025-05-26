import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DefaultLayout } from '@layouts';
import { HomePage } from '@pages';
import { APP_ROUTES } from '@routes';

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route element={<HomePage />} path={APP_ROUTES.HOME} />
        </Route>
      </Routes>
    </Router>
  );
};