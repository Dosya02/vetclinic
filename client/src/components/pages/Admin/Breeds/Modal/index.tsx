import { useRef, type FC, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import { DefaultDropdown, Input } from '@components/form'
import { Button, Modal } from '@components/ui'
import type { DropdownOptionType } from '@constants'
import { useBoolean } from '@hooks'
import styles from './styles.module.css'

interface BreedsModalProps {
	isActive: boolean
	text: string
	closeFn: () => void
	onSubmit: () => Promise<{ message: string }>
	name: string
	setName: (value: string) => void
	speciesOptions: DropdownOptionType[]
	selectedSpeciesId: string
	setSelectedSpeciesId: (value: string) => void
}

export const BreedsModal: FC<BreedsModalProps> = ({
	isActive,
	text,
	closeFn,
	onSubmit,
	name,
	setName,
	speciesOptions,
	selectedSpeciesId,
	setSelectedSpeciesId,
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
			toast.error('Введите название породы')
			return
		}
		if (!selectedSpeciesId) {
			toast.error('Выберите вид питомца')
			return
		}

		try {
			isSubmitting.setTrue()
			const response = await onSubmit()
			toast.success(response.message)
			setName('')
			setSelectedSpeciesId('')
			closeFn()
		} catch {
			toast.error('Ошибка при сохранении')
		} finally {
			isSubmitting.setFalse()
		}
	}

	const selectedOption = speciesOptions.find(
		opt => opt.id === selectedSpeciesId,
	)

	return (
		<Modal isOpen={isActive} closeFn={closeFn} ref={ref}>
			<div className={styles.content}>
				<p className={styles.text}>{text}</p>
				<div className={styles.inner}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.field}>
							<Input
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Введите название породы"
							/>
						</div>
						<div className={styles.field}>
							<DefaultDropdown
								options={speciesOptions}
								selectedOption={selectedOption}
								onChange={setSelectedSpeciesId}
								placeholder="Выберите вид питомца"
							/>
						</div>
						<div className={styles.buttons}>
							<Button
								text="Отмена"
								alternate
								onClick={handleCancel}
								disabled={isSubmitting.value}
							/>
							<Button
								type="submit"
								text={isSubmitting.value ? 'Сохранение...' : 'Сохранить'}
								disabled={isSubmitting.value}
							/>
						</div>
					</form>
				</div>
			</div>
		</Modal>
	)
}