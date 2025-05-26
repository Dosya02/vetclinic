import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@components';
import { LogoDarkIcon, LogoLightIcon } from '@images';
import { APP_ROUTES } from '@routes';
import styles from './Logo.module.css';

interface Props {
  variant: 'light' | 'dark';
}

export const Logo: FC<Props> = ({ variant }) => (
  <Link className={styles.logo} to={APP_ROUTES.HOME}>
    <div className={styles.image}>
      <Image
        src={variant === 'light' ? LogoLightIcon : LogoDarkIcon}
        alt="logo"
      />
    </div>
    <h6 className={`
			${styles.title}
			${variant === 'light' ? styles.titleLight : styles.titleDark}
		`}>
      Добрый <br/>
      <span>Доктор Айболит</span>
    </h6>
  </Link>
);