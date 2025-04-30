import { ChangeEvent, FC, FormEvent } from "react";
import {
	FormButton,
	FormCheckbox,
	FormInput,
} from "../../../components";
import { AuthSteps } from "../../../enums";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
	changeAgree,
	changeEmail,
	changeStep,
	sendVerificationCode,
} from "../../../store/reducers";
import styles from "./Form.module.css";
import { store } from "../../../store/store";

export const RegistrationForm: FC = () => {
	const {
		email,
		agree,
		emailErrorMessage,
		agreeErrorMessage,
	} = useAppSelector(state => state.authReducer);
	const dispatch = useAppDispatch();

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
		dispatch(changeEmail(e.target.value));
	}

	const handleAgreeChange = (e: ChangeEvent<HTMLInputElement>): void => {
		dispatch(changeAgree(e.target.checked));
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		dispatch(changeEmail(email));
		dispatch(changeAgree(agree));

		await new Promise(resolve => setTimeout(resolve, 0));

		const { emailErrorMessage, agreeErrorMessage } = store.getState().authReducer;

		if (emailErrorMessage || agreeErrorMessage) {
			return;
		}

		try {
			const resultAction = await dispatch(sendVerificationCode({ email }));

			if (sendVerificationCode.fulfilled.match(resultAction)) {
				dispatch(changeStep(AuthSteps.VERIFY_CODE));
			}
		} catch (err) {
			console.error("Ошибка при выполнении запроса:", err);
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<FormInput
				placeholder="Введите почту"
				value={email}
				onChange={handleEmailChange}
				errorMessage={emailErrorMessage}
			/>
			<FormCheckbox
				text="Я согласен с условиями предоставления услуг"
				checked={agree}
				onChange={handleAgreeChange}
				errorMessage={agreeErrorMessage}
			/>
			<div className={styles.buttonWrapper}>
				<FormButton text="Регистрация" fullWidth />
			</div>
		</form>
	);
}