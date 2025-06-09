import { forwardRef, type ForwardedRef } from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

interface HeaderBurgerProps {
	isActive: boolean
	toggleFn: () => void
}

export const HeaderBurger = forwardRef<HTMLDivElement, HeaderBurgerProps>(
	({ isActive, toggleFn }, ref: ForwardedRef<HTMLDivElement | null>) => {
		return (
			<div
				ref={ref}
				className={clsx(styles.burger, isActive && styles.active)}
				onClick={toggleFn}
			>
				<span />
			</div>
		)
	}
)