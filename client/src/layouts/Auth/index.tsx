import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Image, NavToText } from '@components';
import { APP_ROUTES } from '@routes';
import { AuthBgImg } from '@images';
import { EmailModal } from './EmailModal';
import { useModal } from '@hooks';
import { PasswordModal } from './PasswordModal';

export const AuthLayout: FC = () => {
  const codeModal = useModal(true);
  const emailModal = useModal(false);
  const passwordModal = useModal(true);

  return (
    <div className="c-auth">
      <main>
        <Image className="c-auth__image" src={AuthBgImg}/>
        <div className="c-auth__inner">
          <NavToText
            className="c-auth__inner-link"
            to={APP_ROUTES.HOME}
            text="← На главную"
          />
          <Outlet/>
        </div>
      </main>
      <EmailModal isActive={emailModal.isOpen}/>
      <PasswordModal isActive={passwordModal.isOpen}/>
    </div>
  );
};