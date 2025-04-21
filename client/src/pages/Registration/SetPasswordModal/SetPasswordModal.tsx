import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setPassword, setStep } from "../../../store/reducers";
import { useCreatePasswordMutation } from "../../../store/api";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { validatePassword } from "../../../utils";
import { FormButton, FormPasswordInput } from "../../../components";
import styles from "./SetPasswordModal.module.css";

export const SetPasswordModal: FC = () => {
	const navigate = useNavigate();
	const { email, password } = useAppSelector(state => state.registrationReducer);
	const dispatch = useAppDispatch();

	const [createPassword] = useCreatePasswordMutation();

	const [errorMessage, setErrorMessage] = useState("");

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
		dispatch(setPassword(e.target.value));
		setErrorMessage("");
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const error = validatePassword(password);
		if (error) {
			setErrorMessage(error);
			return;
		}

		try {
			await createPassword({ email, password }).unwrap();
			dispatch(setStep("email"));
			navigate("/");
		} catch (error) {
			console.error("Ошибка при установке пароля: ", error);
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
						value={password}
						onChange={handlePasswordChange}
						errorMessage={errorMessage}
					/>
					<FormButton text="Подтвердить" />
				</form>
			</div>
		</div>
	);
}