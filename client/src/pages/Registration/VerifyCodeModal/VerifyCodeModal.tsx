import { ChangeEvent, FC, useState, KeyboardEvent } from "react";
import { MailIcon } from "../../../assets";
import { Button, ErrorMessage, FormPinInput, Image } from "../../../components";
import { RegistrationSteps } from "../../../enums";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { verifyCode } from "../../../store/reducers";
import styles from "./VerifyCodeModal.module.css";

interface Props {
	email: string
	setStep: (step: RegistrationSteps) => void
	onClose: () => void
}

export const VerifyCodeModal: FC<Props> = ({ email, setStep, onClose }) => {
	const { error } = useAppSelector(state => state.authReducer);
	const dispatch = useAppDispatch();

	const [code, setCode] = useState<string[]>(Array(6).fill(""));
	const [codeErrorMessage, setCodeErrorMessage] = useState("");

	const handleCodeChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
		const value = e.target.value;

		if (!/^\d?$/.test(value)) return;

		setCode(prev => {
			const newCode = [...prev];
			newCode[index] = value;
			return newCode;
		});

		if (value && e.target.nextElementSibling instanceof HTMLInputElement) {
			e.target.nextElementSibling.focus();
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			const prev = e.currentTarget.previousElementSibling as HTMLInputElement;
			if (prev) prev.focus();
		}
	};

	const handleClick = async () => {
		const verificationCode = code.join("");

		if (verificationCode.length !== 6) {
			setCodeErrorMessage("Введите 6-значный код");
			return;
		}

		try {
			const resultAction = await dispatch(verifyCode({ email, verificationCode }));

			if (verifyCode.fulfilled.match(resultAction)) {
				setStep(RegistrationSteps.SET_PASSWORD);
				return;
			}

			console.error("Ошибка при верификации кода.");
		} catch (err) {
			console.error("Ошибка при выполнении запроса:", err);
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<Image src={MailIcon} alt="main icon" />
			</div>
			<div className={styles.content}>
				<p className={styles.text}>
					Код подтверждения отправлен на адрес <span>{email}</span>. Чтобы продолжить, введите этот код.
				</p>
				{error && <ErrorMessage message={error} />}
				<div className={styles.inputsWrapper}>
					<div className={styles.inputs}>
						{code.map((digit, index) => (
							<FormPinInput
								key={index}
								value={digit}
								onChange={(e) => handleCodeChange(e, index)}
								onKeyDown={(e) => handleKeyDown(e, index)}
							/>
						))}
					</div>
					{codeErrorMessage && <ErrorMessage message={codeErrorMessage} />}
				</div>
				<div className={styles.buttons}>
					<Button type="reverse" text="Отмена" onClick={onClose} />
					<Button text="Отправить" onClick={handleClick} />
				</div>
			</div>
		</div>
	);
}