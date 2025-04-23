import { ChangeEvent, FC, FormEvent, useState } from "react";
import { FormButton, FormPasswordInput } from "../../../components";
import { useAppDispatch } from "../../../hooks";
import { setPassword } from "../../../store/reducers";
import { validatePassword } from "../../../utils";
import styles from "./SetPasswordModal.module.css";
import { RegistrationSteps } from "../../../enums";

interface Props {
	email: string
	setStep: (step: RegistrationSteps) => void
}

export const SetPasswordModal: FC<Props> = ({ email, setStep }) => {
	const dispatch = useAppDispatch();

	const [formState, setFormState] = useState({
		password: "",
		passwordErrorMessage: "",
	});

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setFormState(prev => ({
			...prev,
			password: e.target.value,
			passwordErrorMessage: "",
		}));
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const passwordError = validatePassword(formState.password);

		if (passwordError) {
			setFormState(prev => ({
				...prev,
				passwordErrorMessage: passwordError,
			}));
			return;
		}

		try {
			const resultAction = await dispatch(
				setPassword({ email, password: formState.password })
			);

			if (setPassword.fulfilled.match(resultAction)) {
				setStep(RegistrationSteps.COMPLETED);
				return;
			}

			console.error("Ошибка при установке пароля.");
		} catch (err) {
			console.error("Ошибка при выполнении запроса:", err);
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<p className={styles.text}>
					Регистрация почти завершена. Пожалуйста, установите пароль.
				</p>
				<form className={styles.form} onSubmit={handleSubmit}>
					<FormPasswordInput
						placeholder="Введите пароль"
						value={formState.password}
						onChange={handlePasswordChange}
						errorMessage={formState.passwordErrorMessage}
					/>
					<FormButton text="Подтвердить" />
				</form>
			</div>
		</div>
	);
}