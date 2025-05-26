import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '@components';
import { Header } from './Header';
import styles from './DefaultLayout.module.css';

export const Index: FC = () => (
  <div className={styles.wrapper}>
    <Header/>
    <main className={styles.main}>
      <Outlet/>
    </main>
    <Footer/>
  </div>
);
