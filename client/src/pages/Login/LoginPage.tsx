import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ErrorMessage, FormButton, FormInput, FormPasswordInput, Loader } from "../../components";
import styles from "./LoginPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils";
import { login } from "../../store/reducers";
import { pageConfig } from "../../config";

export const LoginPage: FC = () => {
	const navigate = useNavigate();
	const { loading, error } = useAppSelector(state => state.authReducer);
	const dispatch = useAppDispatch();

	const [formState, setFormState] = useState({
		email: "",
		emailErrorMessage: "",
		password: "",
		passwordErrorMessage: "",
	});

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setFormState(prev => ({
			...prev,
			email: e.target.value,
			emailErrorMessage: "",
		}));
	}

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setFormState(prev => ({
			...prev,
			password: e.target.value,
			passwordErrorMessage: "",
		}));
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		const emailError = validateEmail(formState.email);
		const passwordError = validatePassword(formState.password);

		if (emailError || passwordError) {
			setFormState(prev => ({
				...prev,
				emailErrorMessage: emailError,
				passwordErrorMessage: passwordError,
			}));
			return;
		}

		try {
			const resultAction = await dispatch(login({
				email: formState.email,
				password: formState.password,
			}));

			if (!login.fulfilled.match(resultAction)) {
				console.error("Ошибка при авторизации.");
				return;
			}

			navigate(pageConfig.profile);
		} catch (err) {
			console.error("Ошибка при выполнении запроса:", err);
		}
	}

	return (
		<div className={styles.content}>
			<h3 className={styles.title}>Войти</h3>
			<form className={styles.form} onSubmit={handleSubmit}>
				{error && <ErrorMessage message={error} />}
				<FormInput
					type="email"
					placeholder="Введите почту"
					value={formState.email}
					onChange={handleEmailChange}
					errorMessage={formState.emailErrorMessage}
				/>
				<FormPasswordInput
					placeholder="Введите пароль"
					value={formState.password}
					onChange={handlePasswordChange}
					errorMessage={formState.passwordErrorMessage}
				/>
				<div className={styles.buttonWrapper}>
					<FormButton text="Войти" />
				</div>
			</form>
			<p className={styles.text}>
				Ещё нет аккаунта? <Link className={styles.link} to='/registration'>Регистрация</Link>
			</p>
			{loading && <Loader />}
		</div>
	);
}