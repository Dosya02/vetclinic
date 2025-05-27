import { Button, Input } from "@components";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { changeEmail } from "@store/reducers";
import styles from "./styles.module.css";

export const Form: React.FC = () => {
	const { email, emailErrorMessage } = useAppSelector(state => state.authReducer);
	const dispatch = useAppDispatch();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		dispatch(changeEmail(value));
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.item}>
				<Input
					placeholder="Введите почту"
					value={email}
					onChange={handleEmailChange}
					errorMessage={emailErrorMessage}
				/>
			</div>
			<Button text="Подтвердить" type="submit" />
		</form>
	);
}