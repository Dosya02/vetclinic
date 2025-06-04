import { FC, Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Loader, ScrollToTop } from '@components';
import { AuthProvider } from '@providers';
import { AdminRoutes, AuthRoutes, DefaultRoutes, PublicRoutes } from '@routes';
import 'react-toastify/dist/ReactToastify.css';

export const AppRoutes: FC = () => (
  <>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop/>
        <Suspense fallback={<Loader/>}>
          <Routes>
            {PublicRoutes}
            {DefaultRoutes}
            {AuthRoutes}
            {AdminRoutes}
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />
  </>
);