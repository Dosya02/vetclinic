import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@components';
import { ICONS } from '@constants';
import { APP_ROUTES } from '@routes';

export const HeaderActions: FC = () => (
	<div className="c-header-actions c-header__actions">
		<Link className="c-header-actions__auth" to={APP_ROUTES.LOGIN}>
			<Icon
				className="c-header-actions__auth-icon"
				name={ICONS.USER}
			/>
		</Link>
	</div>
);