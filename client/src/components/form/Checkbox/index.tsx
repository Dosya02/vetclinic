import { ChangeEvent, FC } from 'react';
import { ErrorMessage } from '@components';

interface Props {
	text: string;
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	errorMessage: string | null;
};

export const Checkbox: FC<Props> = ({
	text,
	checked,
	onChange,
	errorMessage,
}) => (
	<div className="c-checkbox">
		<label className="c-checkbox__label">
			<input
				className="c-checkbox__input"
				type="checkbox"
				checked={checked}
				onChange={onChange}
			/>
			<span className="c-checkbox__checkmark u-cursor-pointer" />
			<span className="c-checkbox__text">{text}</span>
		</label>
		{errorMessage && <ErrorMessage message={errorMessage} />}
	</div>
);