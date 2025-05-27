import { Button, ErrorMessage, PinInput } from "@components";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { changeCode, setFullCode } from "@store/reducers";
import styles from "./styles.module.css";

export const Form: React.FC = () => {
	const { code, codeErrorMessage } = useAppSelector(state => state.authReducer);
	const dispatch = useAppDispatch();

	const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
		const value = e.target.value;

		if (!/^\d?$/.test(value)) return;

		dispatch(changeCode({ index, value }));

		if (value && e.target.nextElementSibling instanceof HTMLInputElement) {
			e.target.nextElementSibling.focus();
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			const prev = e.currentTarget.previousElementSibling as HTMLInputElement;
			if (prev) prev.focus();
		}
	}

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
		const pastedData = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, 6);
		if (!pastedData) return;

		const digits = pastedData.split("").slice(0, 6);
		dispatch(setFullCode(digits));
		e.preventDefault();

		const lastIndex = digits.length - 1;

		setTimeout(() => {
			const inputs = document.querySelectorAll("input[type='text']");

			for (let i = 0; i < inputs.length; i++) {
				if ((inputs[i] as HTMLInputElement).value === "") {
					(inputs[i] as HTMLInputElement).focus();
					return;
				}
			}

			if (inputs[lastIndex]) {
				(inputs[lastIndex] as HTMLInputElement).focus();
			}
		}, 0);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.inputs}>
				{code.map((digit, index) => (
					<PinInput
						key={index}
						value={digit}
						onChange={(e) => handleCodeChange(e, index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						onPaste={handlePaste}
					/>
				))}
				<div className={styles.errorMessage}>
					{codeErrorMessage && <ErrorMessage message={codeErrorMessage} />}
				</div>
			</div>
			<div className={styles.buttons}>
				<Button text="Отмена" type="button" reverse />
				<Button text="Отправить" type="button" />
			</div>
		</div>
	);
}