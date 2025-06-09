import { useCallback, useEffect, useRef, type FC, type ReactNode } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

interface DropdownProps {
	isActive: boolean
	closeFn: () => void
	toggleFn: () => void
	trigger: ReactNode
	children: ReactNode
	direction?: 'left' | 'right' | 'both'
	className?: string
}

export const Dropdown: FC<DropdownProps> = ({
	isActive,
	closeFn,
	toggleFn,
	trigger,
	className,
	direction = 'left',
	children,
}) => {
	const ref = useRef<HTMLDivElement | null>(null)

	const handleClickOutside = useCallback((e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			closeFn?.()
		}
	}, [closeFn])

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [handleClickOutside])

	return (
		<div
			className={clsx(styles.dropdown, className)}
			ref={ref}
		>
			<div className={styles.trigger} onClick={toggleFn}>
				{trigger}
			</div>
			<div className={clsx(
				styles.menu,
				isActive && styles.active,
				direction === 'left' && styles.directionLeft,
				direction === 'right' && styles.directionRight,
				direction === 'both' && styles.directionBoth,
			)}>
				{children}
			</div>
		</div>
	)
}