import { FC, ReactNode, useEffect } from 'react';

interface Props {
	active: boolean;
	children: ReactNode;
	variant?: 'light' | 'dark';
};

export const Modal: FC<Props> = ({ active, children, variant = 'dark' }) => {
	useEffect(() => {
		if (active) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [active]);

	return (
		<div className={`c-modal ${active ? "active" : ""} ${variant}`}>
			{children}
		</div>
	);
};