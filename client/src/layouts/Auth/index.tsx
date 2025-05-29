import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Image, NavToText } from '@components';
import { APP_ROUTES } from '@routes';
import { AuthBgImg } from '@images';

export const AuthLayout: FC = () => {
  return (
    <div className="o-auth-wrapper">
      <main>
        <div className="o-auth-wrapper__image">
          <Image src={AuthBgImg} alt="auth bg"/>
        </div>
        <div className="o-auth-wrapper__content">
          <NavToText
            className="o-auth-wrapper__link"
            to={APP_ROUTES.HOME}
            text="← На главную"
          />
          <Outlet/>
        </div>
      </main>
    </div>
  );
};