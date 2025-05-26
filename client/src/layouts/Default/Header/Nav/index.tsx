import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '@constants';

export const HeaderNav: FC = () => {
	const navigate = useNavigate();

	const handleClick = (id: string) => {
		navigate(`/#${id}`);
	}

	return (
		<nav className="c-nav">
			<ul className="c-nav__list">
				{NAV_ITEMS.map(({ id, label }) =>
					<li
						key={id}
						className="c-nav__item u-cursor-pointer"
						onClick={() => handleClick(id)}
					>
						<span className="c-nav__label">
							{label}
						</span>
					</li>
				)}
			</ul>
		</nav>
	);
}