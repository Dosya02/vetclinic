import { Modal } from "@components";
import { Form } from "./Form";
import styles from "./styles.module.css";

interface Props {
	active: boolean;
}

export const PasswordModal: React.FC<Props> = ({ active }) => (
	<Modal active={active}>
		<div className={styles.wrapper}>
			<p className={styles.text}>
				Регистрация почти завершена. Пожалуйста, установите пароль.
			</p>
			<Form />
		</div>
	</Modal>
);
