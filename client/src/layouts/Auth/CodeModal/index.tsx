import { Icon, Modal } from "@components";
import { ICONS } from "@constants";
import { useAppSelector } from "@store/hooks";
import { Form } from "./Form";
import styles from "./styles.module.css";

interface Props {
	active: boolean;
}

export const CodeModal: React.FC<Props> = ({ active }) => {
	const { email } = useAppSelector(state => state.authReducer);

	return (
		<Modal active={active}>
			<div className={styles.wrapper}>
				<Icon className={styles.icon} name={ICONS.MAIL_CHECKED} />
				<div className={styles.content}>
					<p className={styles.text}>
						Код подтверждения отправлен на адрес <span>{email}</span>. Чтобы продолжить, введите этот код.
					</p>
					<Form />
				</div>
			</div>
		</Modal>
	);
}