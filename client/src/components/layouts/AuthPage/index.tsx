import { FC, ReactNode } from 'react';
import { NavToText } from '@components';
import { useAppDispatch } from '@store/hooks';
import { resetFields } from '@store/reducers';

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
  const dispatch = useAppDispatch();
  
  const handleResetFields = () => dispatch(resetFields());
  
  return (
    <div className="c-auth__content">
      <h3 className="c-auth__content-title">
        {title}
      </h3>
      {children}
      <p className="c-auth__content-text">
        {linkCaption}
        {' '}
        <span onClick={handleResetFields}>
					<NavToText to={linkTo} text={linkText}/>
				</span>
      </p>
    </div>
  );
};