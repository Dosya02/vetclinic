import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Image, NavToText } from '@components';
import { APP_ROUTES } from '@routes';
import { AuthBgImg } from '@images';

export const AuthLayout: FC = () => {
  return (
    <div className="c-auth">
      <main>
        <Image className="c-auth__image" src={AuthBgImg} />
        <div className="c-auth__content">
          <NavToText
            className="c-auth__content-link"
            to={APP_ROUTES.HOME}
            text="← На главную"
          />
          <Outlet />
        </div>
      </main>
    </div>
  );
};