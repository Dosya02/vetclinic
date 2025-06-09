import { useRef, type FC } from 'react'
import { Modal } from '@components/ui'
import { PasswordModalForm } from './Form'
import styles from './styles.module.css'

interface PasswordModalProps {
	isOpen: boolean
	text: string
	isLoading: boolean
	closeFn: () => void
	onSubmitFn: (data: { email: string, password: string }) => Promise<{
		message: string
		token: string
	}>
}

export const PasswordModal: FC<PasswordModalProps> = ({
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
				<p className={styles.text}>{text}</p>
				<PasswordModalForm
					isLoading={isLoading}
					onSubmitFn={onSubmitFn}
				/>
			</div>
		</Modal>
	)
}