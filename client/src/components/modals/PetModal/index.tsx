import { useRef, type FC } from 'react'
import { Modal } from '@components/ui'
import type { PetModel } from '@models'
import { PetModalForm } from './Form'
import styles from './styles.module.css'

interface PetModalProps {
	isOpen: boolean
	closeFn: () => void
	petToEdit?: PetModel
}

export const PetModal: FC<PetModalProps> = ({
	isOpen,
	closeFn,
	petToEdit,
}) => {
	const ref = useRef<HTMLDivElement | null>(null)

	return (
		<Modal
			isOpen={isOpen}
			closeFn={closeFn}
			ref={ref}
		>
			<div className={styles.content}>
				<span
					className={styles.link}
					onClick={closeFn}
				>
					← Назад к питомцам
				</span>
				<h3 className={styles.title}>
					{petToEdit ? 'Редактирование карточки' : 'Создание карточки питомца'}
				</h3>
				<PetModalForm
					closeFn={closeFn}
					petToEdit={petToEdit}
				/>
			</div>
		</Modal>
	)
}