import { useRef, type FC, type ReactNode } from 'react'
import { Avatar, Icon, Modal } from '@components/ui'
import type { StructuredDateModel } from '@models'
import styles from './styles.module.css'
import { ICONS } from '@constants'

interface PetInfoModalProps {
	isOpen: boolean
	closeFn: () => void
	linkText: string
	name: string
	species: string
	breed: string
	birthDate: StructuredDateModel
	imageUrl?: string
	features?: string[]
	editFn?: () => void
	deleteFn?: () => void
	children: ReactNode
}

export const PetInfoModal: FC<PetInfoModalProps> = ({
	isOpen,
	closeFn,
	linkText,
	name,
	species,
	breed,
	birthDate,
	imageUrl,
	features = [],
	editFn,
	deleteFn,
	children,
}) => {
	const ref = useRef<HTMLDivElement | null>(null)

	return (
		<Modal
			isOpen={isOpen}
			closeFn={closeFn}
			ref={ref}
		>
			<div className={styles.inner}>
				<span className={styles.link} onClick={closeFn}>
					{linkText}
				</span>
				<div className={styles.icons}>
					{editFn && (
						<button onClick={editFn}>
							<Icon
								className={`${styles.icon} ${styles.editIcon}`}
								name={ICONS.EDIT}
							/>
						</button>
					)}
					{deleteFn && (
						<button onClick={deleteFn}>
							<Icon
								className={`${styles.icon} ${styles.trashIcon}`}
								name={ICONS.TRASH}
							/>
						</button>
					)}
				</div>
				<div className={styles.wrapper}>
					<div className={styles.image}>
						<Avatar
							className={styles.avatar}
							type="pet"
							imageUrl={imageUrl}
						/>
					</div>
					<div className={styles.content}>
						<h4 className={styles.title}>
							{name}
						</h4>
						<p className={styles.text}>
							Вид: {species}
						</p>
						<p className={styles.text}>
							Порода: {breed}
						</p>
						<p className={styles.text}>
							Дата рождения: {birthDate.day}.{birthDate.month}.{birthDate.year}
						</p>
						{features.length > 0 && (
							<>
								<h5 className={styles.subtitle}>
									Особенности:
								</h5>
								{features.map((feature, index) => (
									<p className={styles.text} key={index}>
										{feature}
									</p>
								))}
							</>
						)}
					</div>
				</div>
				{children}
			</div>
		</Modal>
	)
}