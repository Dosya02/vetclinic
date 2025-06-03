import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthBgImg } from '@images';
import { Image, NavToText } from '@components';
import { useResetAuthFields } from '@hooks';
import { APP_ROUTES } from '@routes';

export const AuthLayout: FC = () => {
  const resetAuthFields = useResetAuthFields();

  return (
    <div className="c-auth">
      <main>
        <Image className="c-auth__image" src={AuthBgImg}/>
        <div className="c-auth__inner">
          <NavToText
            className="c-auth__inner-link"
            to={APP_ROUTES.HOME}
            text="← На главную"
            onClick={resetAuthFields}
          />
          <Outlet/>
        </div>
      </main>
    </div>
  );
};