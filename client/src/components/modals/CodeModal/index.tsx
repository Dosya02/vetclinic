import { useRef, type FC, type ReactNode } from 'react'
import { Icon, Modal } from '@components/ui'
import { ICONS } from '@constants'
import { CodeModalForm } from './Form'
import styles from './styles.module.css'

interface CodeModalProps {
	isOpen: boolean
	isLoading: boolean
	closeFn: () => void
	onSubmitFn: (data: { email: string, code: string }) => Promise<{
		message: string
	}>
	children: ReactNode
}

export const CodeModal: FC<CodeModalProps> = ({
	isOpen,
	isLoading,
	closeFn,
	onSubmitFn,
	children,
}) => {
	const ref = useRef<HTMLDivElement | null>(null)

	return (
		<Modal
			isOpen={isOpen}
			closeFn={closeFn}
			ref={ref}
		>
			<div className={styles.content}>
				<Icon className={styles.icon} name={ICONS.MAIL_CHECKED} />
				<div className={styles.inner}>
					<p className={styles.text}>
						{children}
					</p>
					<CodeModalForm
						isLoading={isLoading}
						onSubmitFn={onSubmitFn}
					/>
				</div>
			</div>
		</Modal>
	)
}