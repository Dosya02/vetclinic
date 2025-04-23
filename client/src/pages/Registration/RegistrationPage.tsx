import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, FormButton, FormCheckbox, FormInput, Loader, Modal } from "../../components";
import { pageConfig } from "../../config";
import { RegistrationSteps } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { sendVerificationCode } from "../../store/reducers";
import { validateEmail } from "../../utils";
import { VerifyCodeModal } from "./VerifyCodeModal/VerifyCodeModal";
import styles from "./RegistrationPage.module.css";
import { SetPasswordModal } from "./SetPasswordModal/SetPasswordModal";

export const RegistrationPage: FC = () => {
	const { loading, error } = useAppSelector(state => state.authReducer);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const [step, setStep] = useState<RegistrationSteps>(RegistrationSteps.SEND_CODE);
	const [modals, setModals] = useState({
		isVerifyCodeModal: false,
		isSetPasswordModal: false,
	});

	const openModal = useCallback((modal: keyof typeof modals): void => {
		setModals(prev => ({ ...prev, [modal]: true }));
	}, []);

	const closeModal = useCallback((modal: keyof typeof modals): void => {
		setModals(prev => ({ ...prev, [modal]: false }));
	}, []);

	const [formState, setFormState] = useState({
		email: "",
		emailErrorMessage: "",
		agree: false,
		agreeErrorMessage: "",
	});

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setFormState(prev => ({
			...prev,
			email: e.target.value,
			emailErrorMessage: "",
		}));
	}

	const handleAgreeChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setFormState(prev => ({
			...prev,
			agree: e.target.checked,
			agreeErrorMessage: "",
		}));
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		const emailError = validateEmail(formState.email);
		const agreeError = formState.agree ? "" : "Вы должны согласиться с условиями.";

		if (emailError || agreeError) {
			setFormState(prev => ({
				...prev,
				emailErrorMessage: emailError,
				agreeErrorMessage: agreeError,
			}));
			return;
		}

		try {
			const resultAction = await dispatch(sendVerificationCode({ email: formState.email }));

			if (sendVerificationCode.fulfilled.match(resultAction)) {
				setStep(RegistrationSteps.VERIFY_CODE);
				return;
			}

			console.error("Ошибка при отправке кода.");
		} catch (err) {
			console.error("Ошибка при выполнении запроса:", err);
		}
	}

	useEffect(() => {
		switch (step) {
			case RegistrationSteps.SEND_CODE:
				setModals({
					isVerifyCodeModal: false,
					isSetPasswordModal: false,
				});
				break;
			case RegistrationSteps.VERIFY_CODE:
				closeModal("isSetPasswordModal");
				openModal("isVerifyCodeModal");
				break;
			case RegistrationSteps.SET_PASSWORD:
				closeModal("isVerifyCodeModal");
				openModal("isSetPasswordModal");
				break;
			case RegistrationSteps.COMPLETED:
				setModals({
					isVerifyCodeModal: false,
					isSetPasswordModal: false,
				});
				navigate(pageConfig.profile);
				break;
			default:
				break;
		}
	}, [step, closeModal, openModal, navigate]);

	return (
		<div className={styles.content}>
			<h3 className={styles.title}>Регистрация</h3>
			<form className={styles.form} onSubmit={handleSubmit}>
				{error
					&& step === RegistrationSteps.SEND_CODE
					&& <ErrorMessage message={error} />
				}
				<FormInput
					type="email"
					placeholder="Введите почту"
					value={formState.email}
					onChange={handleEmailChange}
					errorMessage={formState.emailErrorMessage}
				/>
				<FormCheckbox
					text="Я согласен с условиями предоставления услуг"
					checked={formState.agree}
					onChange={handleAgreeChange}
					errorMessage={formState.agreeErrorMessage}
				/>
				<div className={styles.buttonWrapper}>
					<FormButton text="Регистрация" />
				</div>
			</form>
			<p className={styles.text}>
				Уже есть аккаунт? <Link className={styles.link} to='/login'>Войти</Link>
			</p>
			{loading && <Loader />}
			<Modal isActive={modals.isVerifyCodeModal}>
				<VerifyCodeModal
					email={formState.email}
					setStep={setStep}
					onClose={() => closeModal("isVerifyCodeModal")}
				/>
			</Modal>
			<Modal isActive={modals.isSetPasswordModal}>
				<SetPasswordModal
					email={formState.email}
					setStep={setStep}
				/>
			</Modal>
		</div>
	);
}