import type { FC } from 'react'
import { Loader } from '@components/ui'
import styles from './styles.module.css'

export const LoadingPage: FC = () => (
	<div className={styles.loading}>
		<Loader />
	</div>
)