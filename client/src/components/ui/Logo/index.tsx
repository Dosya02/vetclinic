import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@components';
import { ANCHORS, ICONS } from '@constants';
import { APP_ROUTES } from '@routes';

interface Props {
	variant?: 'light' | 'dark';
};

export const Logo: FC<Props> = ({ variant = 'light' }) => (
	<Link className="c-logo" to={`${APP_ROUTES.HOME}#${ANCHORS.INTRO.id}`}>
		<Icon
			className="c-logo__icon"
			name={variant === "light" ? ICONS.LOGO_LIGHT : ICONS.LOGO_DARK}
		/>
		<h6 className={`
			c-logo__title
			${variant === "dark" ? "c-logo__title--dark" : "c-logo__title--light"}
		`}>
			Добрый <br />
			<span>Доктор Айболит</span>
		</h6>
	</Link>
);