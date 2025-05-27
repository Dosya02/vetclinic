import { FC } from 'react';

interface Props {
	message: string;
};

export const ErrorMessage: FC<Props> = ({ message }) => (
	<span className="c-error__message">{message}</span>
);