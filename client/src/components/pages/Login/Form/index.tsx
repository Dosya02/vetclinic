import type { FC, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Input, PasswordInput } from '@components/form'
import { Button } from '@components/ui'
import { ROUTES, STEPS } from '@constants'
import { useActions, useEmail, usePassword } from '@hooks'
import { useLoginMutation } from '@store/api'
import { getErrorMessage } from '@utils/helpers'
import { validateEmail, validatePassword } from '@utils/validators'
import styles from './styles.module.css'

export const LoginPageForm: FC = () => {
	const navigate = useNavigate()

	const {
		changeAuthStep,
		setAuthToken,
		resetAuthFields,
	} = useActions()

	const { email, onEmailChange } = useEmail()
	const { password, onPasswordChange } = usePassword()

	const [login, { isLoading }] = useLoginMutation()

	const handleResetPassword = () => {
		resetAuthFields()
		changeAuthStep(STEPS.EMAIL)
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()

		const emailError = validateEmail(email)
		const passwordError = validatePassword(password)

		if (emailError || passwordError) {
			if (emailError) toast.error(emailError)
			if (passwordError) toast.error(passwordError)
			return
		}

		try {
			const response = await login({ email, password }).unwrap()
			toast.success(response.message)
			setTimeout(() => {
				setAuthToken(response.token)
				resetAuthFields()
				navigate(ROUTES.HOME)
			}, 1000)
		} catch (err) {
			toast.error(getErrorMessage(err))
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.field}>
				<Input
					className={styles.input}
					placeholder="Введите почту"
					value={email}
					onChange={onEmailChange}
				/>
			</div>
			<div className={styles.field}>
				<PasswordInput
					className={styles.input}
					placeholder="Введите пароль"
					label="Дата и время"
					value={password}
					onChange={onPasswordChange}
				/>
				<span
					className={styles.forgotPassword}
					onClick={handleResetPassword}
				>
					Забыли пароль?
				</span>
			</div>
			<Button
				text={isLoading ? 'Входим...' : 'Войти'}
				type='submit'
				rounded={false}
				disabled={isLoading}
			/>
		</form>
	)
}