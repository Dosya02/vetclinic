import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@components';

export const DefaultLayout: FC = () => (
  <div className="o-wrapper">
    <Header/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
  </div>
);
