import type { FC, ReactNode } from 'react'
import styles from './styles.module.css'

interface ContainerProps {
	children: ReactNode
}

export const Container: FC<ContainerProps> = ({ children }) => (
	<div className={styles.container}>{children}</div>
)