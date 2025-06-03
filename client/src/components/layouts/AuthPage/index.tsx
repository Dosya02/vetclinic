import { FC, ReactNode } from 'react';
import { NavToText } from '@components';
import { useResetAuthFields } from '@hooks';

interface AuthPageLayoutProps {
  title: string;
  linkTo: string;
  linkText: string;
  linkCaption: string;
  children: ReactNode;
}

export const AuthPageLayout: FC<AuthPageLayoutProps> = ({
  title,
  linkTo,
  linkText,
  linkCaption,
  children,
}) => {
  const resetAuthFields = useResetAuthFields();

  return (
    <div className="c-auth__content">
      <h3 className="c-auth__content-title">
        {title}
      </h3>
      {children}
      <p className="c-auth__content-text">
        {linkCaption}
        {' '}
        <NavToText to={linkTo} text={linkText} onClick={resetAuthFields}/>
      </p>
    </div>
  );
};