import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export const DefaultLayout: FC = () => (
  <div className="o-wrapper">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);
