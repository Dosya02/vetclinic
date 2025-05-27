import { ChangeEvent, FC } from 'react';
import { ErrorMessage } from '@components';

interface Props {
	placeholder: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	errorMessage: string | null;
	disabled?: boolean;
}

export const Input: FC<Props> = ({
	placeholder,
	value,
	onChange,
	errorMessage,
	disabled = false,
}) => {
	return (
		<div className="c-input__wrapper">
			<input
				className="c-input__input"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				disabled={disabled}
			/>
			{errorMessage && <ErrorMessage message={errorMessage} />}
		</div>
	);
}