import type { FC, FormEvent } from 'react'
import { toast } from 'react-toastify'
import { Checkbox, Input } from '@components/form'
import { Button } from '@components/ui'
import { STEPS } from '@constants'
import { useActions, useAgree, useEmail } from '@hooks'
import { useSendVerificationCodeMutation } from '@store/api'
import { getErrorMessage } from '@utils/helpers'
import { validateAgree, validateEmail } from '@utils/validators'
import styles from './styles.module.css'

export const RegistrationPageForm: FC = () => {
	const { changeAuthStep } = useActions()

	const { email, onEmailChange } = useEmail()
	const { agree, onAgreeChange } = useAgree()

	const [
		sendVerificationCode,
		{ isLoading },
	] = useSendVerificationCodeMutation()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()

		const emailError = validateEmail(email)
		const agreeError = validateAgree(agree)

		if (emailError || agreeError) {
			if (emailError) toast.error(emailError)
			if (agreeError) toast.error(agreeError)
			return
		}

		try {
			const response = await sendVerificationCode({ email }).unwrap()
			toast.success(response.message)
			changeAuthStep(STEPS.CODE)
		} catch (err) {
			toast.error(getErrorMessage(err))
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input
				className={styles.input}
				placeholder="Введите почту"
				value={email}
				onChange={onEmailChange}
			/>
			<Checkbox
				text="Я согласен с условиями предоставления услуг"
				checked={agree}
				onChange={onAgreeChange}
			/>
			<Button
				text={isLoading ? 'Отправка...' : 'Регистрация'}
				type='submit'
				rounded={false}
				disabled={isLoading}
			/>
		</form>
	)
}