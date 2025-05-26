import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
};

export const Container: FC<Props> = ({ children }) => (
	<div className="o-container">{children}</div>
);