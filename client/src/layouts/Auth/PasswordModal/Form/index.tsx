import { Button, PasswordInput } from "@components";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { changePassword } from "@store/reducers";
import styles from "./styles.module.css";

export const Form: React.FC = () => {
	const { password, passwordErrorMessage } = useAppSelector(state => state.authReducer);
	const dispatch = useAppDispatch();

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		dispatch(changePassword(value));
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.item}>
				<PasswordInput
					placeholder="Введите пароль"
					value={password}
					onChange={handlePasswordChange}
					errorMessage={passwordErrorMessage}
				/>
			</div>
			<Button text="Подтвердить" type="submit" />
		</form>
	);
}