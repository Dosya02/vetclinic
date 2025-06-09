import { type FC } from 'react'
import { toast } from 'react-toastify'
import { PinInput } from '@components/form'
import { Button } from '@components/ui'
import { STEPS } from '@constants'
import { useActions, useAppSelector, useCode } from '@hooks'
import { getErrorMessage } from '@utils/helpers'
import styles from './styles.module.css'

interface CodeModalFormProps {
	isLoading: boolean
	onSubmitFn: (data: { email: string, code: string }) => Promise<{
		message: string
	}>
}

export const CodeModalForm: FC<CodeModalFormProps> = ({
	isLoading,
	onSubmitFn,
}) => {
	const { changeAuthStep, resetAuthFields, setAuthFullCode } = useActions()
	const email = useAppSelector(state => state.authReducer.email)

	const {
		code,
		inputRefs,
		onCodeChange,
		onCodeKeyDown,
		onCodePaste,
	} = useCode()

	const handleCancel = () => {
		toast.info('Операция отменена')
		resetAuthFields()
	}

	const handleSubmit = async (): Promise<void> => {
		const fullCode = code.join('')
		if (fullCode.length !== 6 || code.some(d => d === '')) {
			setAuthFullCode(code)
			return
		}

		try {
			const response = await onSubmitFn({ email, code: fullCode })
			toast.success(response.message)
			changeAuthStep(STEPS.PASSWORD)
		} catch (err) {
			toast.error(getErrorMessage(err))
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.inputs}>
				{code.map((digit, index) => (
					<PinInput
						key={index}
						value={digit}
						onChange={(e) => onCodeChange(e, index)}
						onKeyDown={(e) => onCodeKeyDown(e, index)}
						onPaste={onCodePaste}
						ref={(el) => {
							inputRefs.current[index] = el
						}}
					/>
				))}
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
					text={isLoading ? 'Проверка...' : 'Отправить'}
					onClick={handleSubmit}
					disabled={isLoading}
				/>
			</div>
		</div>
	)
}