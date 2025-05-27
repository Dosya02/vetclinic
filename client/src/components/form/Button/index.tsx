import { FC } from 'react';

interface Props {
	text: string;
	type?: 'button' | 'submit';
	onClick?: () => void;
	disabled?: boolean;
	reverse?: boolean;
	fullWidth?: boolean;
	cornerType?: 'default' | 'rounded';
}

export const Button: FC<Props> = ({
	text,
	type = "button",
	onClick,
	disabled = false,
	reverse = false,
	fullWidth = false,
	cornerType = 'rounded',
}) => (
	<button
		className={`
			c-button
			${reverse ? "c-button--reverse" : ""}
			${fullWidth ? "c-button--full-width" : ""}
			${cornerType == "default"
				? "c-button--border-default"
				: "c-button--border-rounded"
			}
		`}
		type={type}
		onClick={onClick}
		disabled={disabled}
	>
		{text}
	</button>
);