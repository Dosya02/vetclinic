import type { FC, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PasswordInput } from '@components/form'
import { Button } from '@components/ui'
import { ROUTES } from '@constants'
import { useActions, useAppSelector, usePassword } from '@hooks'
import { getErrorMessage } from '@utils/helpers'
import styles from './styles.module.css'

interface PasswordModalFormProps {
	isLoading: boolean
	onSubmitFn: (data: { email: string, password: string }) => Promise<{
		message: string
		token: string
	}>
}

export const PasswordModalForm: FC<PasswordModalFormProps> = ({
	isLoading,
	onSubmitFn,
}) => {
	const navigate = useNavigate()

	const { resetAuthFields, setAuthToken } = useActions()

	const email = useAppSelector(state => state.authReducer.email)
	const { password, onPasswordChange } = usePassword()

	const handleCancel = () => {
		toast.info('Операция отменена')
		resetAuthFields()
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()

		try {
			const response = await onSubmitFn({ email, password })
			console.log(response)
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
				<PasswordInput
					className={styles.input}
					placeholder="Введите пароль"
					value={password}
					onChange={onPasswordChange}
				/>
			</div>
			<div className={styles.buttons}>
				<Button
					className={`${styles.button} ${styles.cancel}`}
					text="Отмена"
					alternate
					wide
					onClick={handleCancel}
					disabled={isLoading}
				/>
				<Button
					className={`${styles.button} ${styles.send}`}
					text={isLoading ? 'Загрузка...' : 'Подтвердить'}
					type="submit"
					disabled={isLoading}
				/>
			</div>
		</form>
	)
}