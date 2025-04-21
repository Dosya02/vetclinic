import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setStep, setEmail, setAgree } from "../../store/reducers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useSendCodeMutation } from "../../store/api";
import { validateEmail } from "../../utils";
import { FormButton, FormCheckbox, FormInput, Modal } from "../../components";
import { VerifyCodeModal } from "./VerifyCodeModal/VerifyCodeModal";
import { SetPasswordModal } from "./SetPasswordModal/SetPasswordModal";
import styles from "./RegistrationPage.module.css";

export const RegistrationPage: FC = () => {
	const { step, email, agree } = useAppSelector(state => state.registrationReducer);
	const dispatch = useAppDispatch();
	const [sendCode] = useSendCodeMutation();

	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [isAgreedError, setIsAgreedError] = useState(false);

	const [isVerifyCodeModalActive, setIsVerifyCodeModalActive] = useState(false);
	const [isSetPasswordModalActive, setIsSetPasswordModalActive] = useState(false);

	const openVerifyCodeModal = () => setIsVerifyCodeModalActive(true);
	const closeVerifyCodeModal = () => setIsVerifyCodeModalActive(false);

	const openSetPasswordModal = () => setIsSetPasswordModalActive(true);
	const closeSetPasswordModal = () => setIsSetPasswordModalActive(false);

	useEffect(() => {
		if (step === "code") {
			closeSetPasswordModal();
			openVerifyCodeModal();
		} else if (step === "password") {
			closeVerifyCodeModal();
			openSetPasswordModal();
		} else {
			closeVerifyCodeModal();
			closeSetPasswordModal();
		}
	}, [step]);

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
		dispatch(setEmail(e.target.value));
		setEmailErrorMessage("");
	}

	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
		dispatch(setAgree(e.target.checked));

		if (e.target.checked) {
			setIsAgreedError(false);
		}
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const errorMessage = validateEmail(email);
		if (errorMessage) {
			setEmailErrorMessage(errorMessage);
			return;
		}

		if (!agree) {
			setIsAgreedError(true);
			return;
		}

		try {
			await sendCode({ email }).unwrap();
			dispatch(setStep("code"));
		} catch (error) {
			console.error("Ошибка при отправке кода: ", error);
		}
	};

	return (
		<div className={styles.content}>
			<h3 className={styles.title}>Регистрация</h3>
			<form className={styles.form} onSubmit={handleSubmit}>
				<FormInput
					type="email"
					placeholder="Введите почту"
					value={email}
					onChange={handleEmailChange}
					errorMessage={emailErrorMessage}
				/>
				<FormCheckbox
					text="Я согласен с условиями предоставления услуг"
					checked={agree}
					onChange={handleCheckboxChange}
					errorMessage={isAgreedError ? "Вы должны согласиться с условиями" : undefined}
				/>
				<div className={styles.buttonWrapper}>
					<FormButton text="Регистрация" />
				</div>
			</form>
			<p className={styles.text}>
				Уже есть аккаунт? <Link className={styles.link} to='/login'>Войти</Link>
			</p>

			<Modal isActive={isVerifyCodeModalActive}>
				<VerifyCodeModal onClose={closeVerifyCodeModal} />
			</Modal>

			<Modal isActive={isSetPasswordModalActive}>
				<SetPasswordModal />
			</Modal>
		</div>
	);
}