import { Modal } from "@components";
import { Form } from "./Form";
import styles from "./styles.module.css";

interface Props {
	active: boolean;
}

export const EmailModal: React.FC<Props> = ({ active }) => (
	<Modal active={active}>
		<div className={styles.wrapper}>
			<p className={styles.text}>
				Для восстановления пароля введи вашу почту.
			</p>
			<Form />
		</div>
	</Modal>
);