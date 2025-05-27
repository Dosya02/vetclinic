import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from '@components';
import { DefaultLayout } from '@layouts';
import { AppointmentPage, HomePage, ServicesPage } from '@pages';
import { APP_ROUTES } from '@routes';

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Загрузка...</div>}>
        <ScrollToTop/>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route element={<HomePage/>} path={APP_ROUTES.HOME}/>
            <Route element={<ServicesPage/>} path={APP_ROUTES.SERVICES}/>
            <Route element={<AppointmentPage/>} path={APP_ROUTES.APPOINTMENT}/>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};