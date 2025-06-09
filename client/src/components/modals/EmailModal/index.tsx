import { useRef, type FC } from 'react'
import { Modal } from '@components/ui'
import { EmailModalForm } from './Form'
import styles from './styles.module.css'

interface EmailModalProps {
	isOpen: boolean
	text: string
	isLoading: boolean
	closeFn: () => void
	onSubmitFn: (data: { email: string }) => Promise<{ message: string }>
}

export const EmailModal: FC<EmailModalProps> = ({
	isOpen,
	text,
	isLoading,
	closeFn,
	onSubmitFn,
}) => {
	const ref = useRef<HTMLDivElement | null>(null)

	return (
		<Modal
			isOpen={isOpen}
			closeFn={closeFn}
			ref={ref}
		>
			<div className={styles.content}>
				<p className={styles.text}>
					{text}
				</p>
				<EmailModalForm
					isLoading={isLoading}
					onSubmitFn={onSubmitFn}
				/>
			</div>
		</Modal>
	)
}