import { ChangeEvent, FC } from 'react';
import { ErrorMessage } from '@components';

interface Props {
	label: string;
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	errorMessage: string | null;
}

export const Checkbox: FC<Props> = ({
	label,
	checked,
	onChange,
	errorMessage,
}) => (
	<div className="c-checkbox">
		<label>
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
			/>
			<span>{label}</span>
		</label>
		{errorMessage && <ErrorMessage message={errorMessage} />}
	</div>
);