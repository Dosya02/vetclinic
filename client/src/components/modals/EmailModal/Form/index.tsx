import type { FC, FormEvent } from 'react'
import { toast } from 'react-toastify'
import { Input } from '@components/form'
import { Button } from '@components/ui'
import { STEPS } from '@constants'
import { useActions, useEmail } from '@hooks'
import { getErrorMessage } from '@utils/helpers'
import { validateEmail } from '@utils/validators'
import styles from './styles.module.css'

interface EmailModalFormProps {
	isLoading: boolean
	onSubmitFn: (data: { email: string }) => Promise<{ message: string }>
}

export const EmailModalForm: FC<EmailModalFormProps> = ({
	isLoading,
	onSubmitFn,
}) => {
	const { changeAuthStep, resetAuthFields, changeAuthEmail } = useActions()

	const { email, onEmailChange } = useEmail()

	const handleCancel = () => {
		toast.info('Операция отменена')
		resetAuthFields()
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()

		const isEmailValid = !validateEmail(email)

		if (!isEmailValid) {
			changeAuthEmail(email)
			return
		}

		try {
			const response = await onSubmitFn({ email })
			toast.success(response.message)
			changeAuthStep(STEPS.CODE)
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
					text={isLoading ? 'Отправка...' : 'Отправить'}
					type="submit"
					disabled={isLoading}
				/>
			</div>
		</form>
	)
}