import { ChangeEvent, FC, KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setCode, setStep } from "../../../store/reducers";
import { MailIcon } from "../../../assets";
import { Button, FormPinInput, Image } from "../../../components";
import styles from "./VerifyCodeModal.module.css";
import { useVerifyCodeMutation } from "../../../store/api";

interface Props {
	onClose: () => void
}

export const VerifyCodeModal: FC<Props> = ({ onClose }) => {
	const { email, code } = useAppSelector(state => state.registrationReducer);
	const dispatch = useAppDispatch();

	const [verifyCode] = useVerifyCodeMutation();

	const handleCodeChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
		const value = e.target.value;

		if (!/^\d?$/.test(value)) return;

		dispatch(setCode({ index, value }));

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

		try {
			const response = await verifyCode({ email, verificationCode }).unwrap();
			console.log("Код подтвержден: ", response);

			dispatch(setStep("password"));
		} catch (error) {
			console.error("Ошибка подтверждения кода: ", error);
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
				<div className={styles.buttons}>
					<Button type="reverse" text="Отмена" onClick={onClose} />
					<Button text="Отправить" onClick={handleClick} />
				</div>
			</div>
		</div>
	);
}