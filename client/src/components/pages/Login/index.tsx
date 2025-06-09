import { useEffect, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthPageLayout } from '@components/layout'
import { CodeModal, EmailModal, PasswordModal } from '@components/modals'
import { ROUTES, STEPS } from '@constants'
import { useAppSelector, useBoolean } from '@hooks'
import {
	useResetPasswordMutation,
	useSendPasswordResetCodeMutation,
	useVerifyPasswordResetCodeMutation,
} from '@store/api'
import { LoginPageForm } from './Form'

const LoginPage: FC = () => {
	const navigate = useNavigate()

	const { email, step } = useAppSelector(state => state.authReducer)

	const emailModal = useBoolean(false)
	const codeModal = useBoolean(false)
	const passwordModal = useBoolean(false)

	const [
		verifyPasswordResetCode,
		{ isLoading: codeModalLoading },
	] = useVerifyPasswordResetCodeMutation()
	const [
		sendPasswordResetCode,
		{ isLoading: emailModalLoading },
	] = useSendPasswordResetCodeMutation()
	const [
		resetPassword,
		{ isLoading: passwordModalLoading },
	] = useResetPasswordMutation()

	const handleVerifyPasswordResetCode = async ({ email, code }: {
		email: string
		code: string
	}): Promise<{ message: string }> => {
		return await verifyPasswordResetCode({ email, code }).unwrap()
	}

	const handleSendPasswordResetCode = async ({ email }: {
		email: string
	}): Promise<{ message: string }> => {
		return await sendPasswordResetCode({ email }).unwrap()
	}

	const handleResetPassword = async ({ email, password }: {
		email: string
		password: string
	}): Promise<{
		message: string
		token: string
	}> => {
		return await resetPassword({ email, newPassword: password }).unwrap()
	}

	useEffect(() => {
		switch (step) {
			case STEPS.IDLE:
				codeModal.setFalse()
				emailModal.setFalse()
				passwordModal.setFalse()
				break
			case STEPS.CODE:
				codeModal.setTrue()
				emailModal.setFalse()
				passwordModal.setFalse()
				break
			case STEPS.EMAIL:
				codeModal.setFalse()
				emailModal.setTrue()
				passwordModal.setFalse()
				break
			case STEPS.PASSWORD:
				codeModal.setFalse()
				emailModal.setFalse()
				passwordModal.setTrue()
				break
			default:
				break
		}
	}, [step, navigate, codeModal, emailModal, passwordModal])

	return (
		<AuthPageLayout
			title="Войти в личный кабинет"
			linkTo={ROUTES.REGISTRATION}
			linkText="Регистрация"
			linkCaption="Ещё нет аккаунта?"
		>
			<LoginPageForm />
			<CodeModal
				isOpen={codeModal.value}
				closeFn={codeModal.setFalse}
				isLoading={codeModalLoading}
				onSubmitFn={handleVerifyPasswordResetCode}
			>
				<>
					Код для сброса пароля отправлен на адрес
					{' '}
					<span>{email}</span>.
					{' '}
					Чтобы продолжить, введите этот код.
				</>
			</CodeModal>
			<EmailModal
				isOpen={emailModal.value}
				closeFn={emailModal.setFalse}
				isLoading={emailModalLoading}
				onSubmitFn={handleSendPasswordResetCode}
				text="Для восстановления пароля введи вашу почту."
			/>
			<PasswordModal
				isOpen={passwordModal.value}
				closeFn={passwordModal.setFalse}
				isLoading={passwordModalLoading}
				onSubmitFn={handleResetPassword}
				text="Пожалуйста, придумайте новый пароль для вашего аккаунта."
			/>
		</AuthPageLayout>
	)
}

export default LoginPage