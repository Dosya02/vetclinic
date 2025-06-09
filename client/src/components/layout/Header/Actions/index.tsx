import type { FC } from 'react'
import { HeaderActionsLanguage } from './Language'
import { HeaderActionsAvatar } from './Avatar'
import styles from './styles.module.css'

export const HeaderActions: FC = () => {
	return (
		<div className={styles.actions}>
			<HeaderActionsLanguage />
			<HeaderActionsAvatar />
		</div>
	)
}