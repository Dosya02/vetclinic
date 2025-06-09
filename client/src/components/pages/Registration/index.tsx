import { useEffect, type FC } from 'react'
import { AuthPageLayout } from '@components/layout'
import { ROUTES, STEPS } from '@constants'
import { RegistrationPageForm } from './Form'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useBoolean } from '@hooks'
import { useRegisterMutation, useVerifyEmailCodeMutation } from '@store/api'
import { CodeModal, PasswordModal } from '@components/modals'

const RegistrationPage: FC = () => {
	const navigate = useNavigate()

	const { email, step } = useAppSelector(state => state.authReducer)
	const codeModal = useBoolean(false)
	const passwordModal = useBoolean(false)

	const [
		verifyEmailCode,
		{ isLoading: codeModalLoading },
	] = useVerifyEmailCodeMutation()
	const [
		register,
		{ isLoading: passwordModalLoading },
	] = useRegisterMutation()

	const handleVerifyEmailCode = async ({ email, code }: {
		email: string
		code: string
	}): Promise<{ message: string }> => {
		return await verifyEmailCode({ email, code }).unwrap()
	}

	const handleRegister = async ({ email, password }: {
		email: string
		password: string
	}): Promise<{ message: string; token: string }> => {
		return await register({ email, password }).unwrap()
	}

	useEffect(() => {
		switch (step) {
			case STEPS.IDLE:
				codeModal.setFalse()
				passwordModal.setFalse()
				break
			case STEPS.CODE:
				codeModal.setTrue()
				passwordModal.setFalse()
				break
			case STEPS.PASSWORD:
				codeModal.setFalse()
				passwordModal.setTrue()
				break
			default:
				break
		}
	}, [step, navigate, codeModal, passwordModal])

	return (
		<AuthPageLayout
			title="Регистрация"
			linkTo={ROUTES.LOGIN}
			linkText="Войти"
			linkCaption="Уже есть аккаунт?"
		>
			<RegistrationPageForm />
			<CodeModal
				isOpen={codeModal.value}
				isLoading={codeModalLoading}
				closeFn={codeModal.setFalse}
				onSubmitFn={handleVerifyEmailCode}
			>
				<>
					Код подтверждения отправлен на адрес
					{' '}
					<span>{email}</span>.
					{' '}
					Чтобы продолжить, введите этот код.
				</>
			</CodeModal>
			<PasswordModal
				isOpen={passwordModal.value}
				isLoading={passwordModalLoading}
				closeFn={passwordModal.setFalse}
				onSubmitFn={handleRegister}
				text="Введите пароль для завершения регистрации."
			/>
		</AuthPageLayout>
	)
}

export default RegistrationPage