import { cloneElement, forwardRef, isValidElement, useEffect } from 'react'
import type { ForwardedRef, MouseEvent, ReactElement, Ref } from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

interface ModalProps {
	isOpen: boolean
	closeFn: () => void
	children: ReactElement<{ ref?: Ref<HTMLDivElement> }>
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
	({
		isOpen,
		closeFn,
		children,
	}, ref: ForwardedRef<HTMLDivElement>) => {
		const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
			if (
				ref &&
				'current' in ref &&
				ref.current &&
				!ref.current.contains(e.target as Node)
			) {
				closeFn()
			}
		}

		useEffect(() => {
			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					closeFn()
				}
			}

			if (isOpen) {
				window.addEventListener('keydown', handleKeyDown)
			}

			return () => {
				window.removeEventListener('keydown', handleKeyDown)
			}
		}, [isOpen, closeFn])

		const childrenWithRef = isValidElement(children)
			? cloneElement(children, { ref })
			: children

		return (
			<div
				className={clsx(styles.modal, isOpen && styles.active)}
				onClick={handleClickOutside}
			>
				<div className={styles.wrapper}>
					{childrenWithRef}
				</div>
			</div>
		)
	}
)

Modal.displayName = 'Modal'