import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
	className?: string;
	id?: string;
	alternate?: boolean;
};

export const Section: FC<Props> = ({ children, className = "", id, alternate = false }) => (
	<section
		id={id}
		className={`c-section ${alternate ? "alternate" : ""} ${className}`}
	>
		{children}
	</section>
);