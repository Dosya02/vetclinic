import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
	to: string;
	text: string;
};

export const NavToText: FC<Props> = ({ to, text }) => (
	<Link to={to}>{text}</Link>
);