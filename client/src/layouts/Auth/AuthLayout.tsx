import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { BackButton, Image } from '../../components';
import { AuthBgImg } from '../../assets/images';
import { pageConfig } from '../../config';
import styles from './AuthLayout.module.css';

export const AuthLayout: FC = () => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.image}>
          <Image src={AuthBgImg} alt="auth bg image"/>
        </div>
        <div className={styles.content}>
          <div className={styles.link}>
            <BackButton to={pageConfig.home} text="На главную"/>
          </div>
          <Outlet/>
        </div>
      </main>
    </div>
  );
};