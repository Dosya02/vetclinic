import { useRef, type FC, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import { Input } from '@components/form'
import { Button, Modal } from '@components/ui'
import { useBoolean } from '@hooks'
import { getErrorMessage } from '@utils/helpers'
import styles from './styles.module.css'

interface ServicesModalProps {
	isActive: boolean
	text: string
	closeFn: () => void
	onSubmit: () => Promise<{ message: string }>
	name: string
	setName: (value: string) => void
}

export const ServicesModal: FC<ServicesModalProps> = ({
	isActive,
	text,
	closeFn,
	onSubmit,
	name,
	setName,
}) => {
	const ref = useRef<HTMLDivElement | null>(null)
	const isSubmitting = useBoolean(false)

	const handleCancel = () => {
		toast.info('Операция отменена')
		closeFn()
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!name.trim()) {
			toast.error('Введите название')
			return
		}

		try {
			isSubmitting.setTrue()
			const response = await onSubmit()
			toast.success(response.message)
			setName('')
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
							<Input
								className={styles.input}
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Введите услугу"
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