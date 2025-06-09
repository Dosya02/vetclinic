import { useRef, type ChangeEvent, type FC, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import { Button, Modal } from '@components/ui'
import { useBoolean } from '@hooks'
import { getErrorMessage } from '@utils/helpers'
import styles from './styles.module.css'
import { FeaturesInput, ImageDropzone, Input, PasswordInput } from '@components/form'

interface AdminVetsModalProps {
	isActive: boolean
	text: string
	closeFn: () => void
	onSubmit: () => Promise<{ message: string }>
	email: string
	password: string
	firstName: string
	lastName: string
	positions: string[]
	initialPreviewUrl: string | null
	handleImageUpload: (file: File) => void
	onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
	onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
	onFirstNameChange: (e: ChangeEvent<HTMLInputElement>) => void
	onLastNameChange: (e: ChangeEvent<HTMLInputElement>) => void
	setPositions: React.Dispatch<React.SetStateAction<string[]>>
}

export const AdminVetsModal: FC<AdminVetsModalProps> = ({
	isActive,
	text,
	closeFn,
	onSubmit,
	email,
	password,
	firstName,
	lastName,
	positions,
	initialPreviewUrl,
	handleImageUpload,
	onEmailChange,
	onPasswordChange,
	onFirstNameChange,
	onLastNameChange,
	setPositions,
}) => {
	const ref = useRef<HTMLDivElement | null>(null)
	const isSubmitting = useBoolean(false)

	const handleCancel = () => {
		toast.info('Операция отменена')
		closeFn()
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			isSubmitting.setTrue()
			const response = await onSubmit()
			toast.success(response.message)
			closeFn()
		} catch (err) {
			toast.error(getErrorMessage(err))
		} finally {
			isSubmitting.setFalse()
		}
	}

	return (
		<Modal isOpen={isActive} closeFn={closeFn} ref={ref}>
			<div className={styles.content}>
				<p className={styles.text}>{text}</p>
				<div className={styles.inner}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.field}>
							<ImageDropzone
								initialPreviewUrl={initialPreviewUrl}
								onImageUpload={handleImageUpload}
							/>
						</div>
						<div className={styles.field}>
							<Input
								value={email}
								onChange={onEmailChange}
								placeholder="Введите почту"
							/>
						</div>
						<div className={styles.field}>
							<PasswordInput
								value={password}
								onChange={onPasswordChange}
								placeholder="Введите пароль"
							/>
						</div>
						<div className={styles.field}>
							<Input
								value={firstName}
								onChange={onFirstNameChange}
								placeholder="Введите имя"
							/>
						</div>
						<div className={styles.field}>
							<Input
								value={lastName}
								onChange={onLastNameChange}
								placeholder="Введите фамилию"
							/>
						</div>
						<div className={styles.field}>
							<FeaturesInput
								features={positions}
								setFeatures={setPositions}
								label="Позиции"
								placeholder="Введите должность и нажмите Enter"
							/>
						</div>
						<div className={styles.buttons}>
							<Button
								className={styles.button}
								text="Отмена"
								rounded
								alternate
								onClick={handleCancel}
								disabled={isSubmitting.value}
							/>
							<Button
								className={styles.button}
								type="submit"
								text={isSubmitting.value ? 'Сохранение...' : 'Сохранить'}
								rounded
								disabled={isSubmitting.value}
							/>
						</div>
					</form>
				</div>
			</div>
		</Modal>
	)
}