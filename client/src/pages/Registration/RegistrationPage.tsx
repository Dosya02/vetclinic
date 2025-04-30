import { FC, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader, Modal } from "../../components";
import { pageConfig } from "../../config";
import { AuthSteps } from "../../enums";
import { useAppSelector } from "../../hooks";
import { RegistrationForm } from "./Form/Form";
import { VerifyCodeModal } from "./VerifyCodeModal/VerifyCodeModal";
import { SetPasswordModal } from "./SetPasswordModal/SetPasswordModal";
import styles from "./RegistrationPage.module.css";

export const RegistrationPage: FC = () => {
	const navigate = useNavigate();
	const { step, loading } = useAppSelector(state => state.authReducer);
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

	useEffect(() => {
		switch (step) {
			case AuthSteps.SEND_CODE:
				setModals({
					isVerifyCodeModal: false,
					isSetPasswordModal: false,
				});
				break;
			case AuthSteps.VERIFY_CODE:
				closeModal("isSetPasswordModal");
				openModal("isVerifyCodeModal");
				break;
			case AuthSteps.SET_PASSWORD:
				closeModal("isVerifyCodeModal");
				openModal("isSetPasswordModal");
				break;
			case AuthSteps.COMPLETED:
				setModals({
					isVerifyCodeModal: false,
					isSetPasswordModal: false,
				});
				navigate(`${pageConfig.profile}/${pageConfig.profileAccountDetails}`);
				break;
			default:
				break;
		}
	}, [step, closeModal, openModal, navigate]);

	return (
		<div className={styles.content}>
			<h3 className={styles.title}>Регистрация</h3>
			<RegistrationForm />
			<p className={styles.text}>
				Уже есть аккаунт? <Link className={styles.link} to='/login'>Войти</Link>
			</p>
			{loading && <Loader />}
			<Modal isActive={modals.isVerifyCodeModal}>
				<VerifyCodeModal onClose={() => closeModal("isVerifyCodeModal")} />
			</Modal>
			<Modal isActive={modals.isSetPasswordModal}>
				<SetPasswordModal />
			</Modal>
		</div>
	);
}