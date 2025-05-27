import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthBgImg } from "@images";
import { Image, NavToText } from "@components";
import { APP_ROUTES } from "@routes";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetFields } from "@store/reducers";
import { PasswordModal } from "./PasswordModal";
import { EmailModal } from "./EmailModal";
import { CodeModal } from "./CodeModal";

export const AuthLayout: React.FC = () => {
	const navigate = useNavigate();
	const { step } = useAppSelector(state => state.authReducer);
	const dispatch = useAppDispatch();

	const [modals, setModals] = useState({
		codeModal: false,
		emailModal: false,
		passwordModal: false,
	});

	const handleClick = () => {
		dispatch(resetFields());
	}

	useEffect(() => {
		switch (step) {
			case "idle":
				setModals({
					codeModal: false,
					emailModal: false,
					passwordModal: false,
				});
				break;
			case "code":
				setModals({
					codeModal: true,
					emailModal: false,
					passwordModal: false,
				});
				break;
			case "email":
				setModals({
					codeModal: false,
					emailModal: true,
					passwordModal: false,
				});
				break;
			case "password":
				setModals({
					codeModal: false,
					emailModal: false,
					passwordModal: true,
				});
				break;
			case "done":
				setModals({
					codeModal: false,
					emailModal: false,
					passwordModal: false,
				});
				navigate(APP_ROUTES.HOME);
				break;
			default:
				break;
		}
	}, [step, navigate]);

	return (
		<div className="o-auth-wrapper">
			<main>
				<div className="o-auth-wrapper__image">
					<Image src={AuthBgImg} alt="auth bg" />
				</div>
				<div className="o-auth-wrapper__content">
					<div className="o-auth-wrapper__link" onClick={handleClick}>
						<NavToText to={APP_ROUTES.HOME} text="← На главную" />
					</div>
					<Outlet />
				</div>
			</main>
			<CodeModal active={modals.codeModal} />
			<EmailModal active={modals.emailModal} />
			<PasswordModal active={modals.passwordModal} />
		</div>
	);
}