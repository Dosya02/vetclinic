import type { FC } from 'react'
import styles from './styles.module.css'
import { Dropdown } from '@components/ui'

export const HeaderActionsLanguage: FC = () => {
	return (
		<Dropdown
			direction="both"
			trigger={
				<div className={styles.trigger}>
					rus
				</div>
			}
		>
			<ul className={styles.list}>
				<li className={styles.item}>
					rus
				</li>
				<li className={styles.item}>
					eng
				</li>
				<li className={styles.item}>
					kaz
				</li>
			</ul>
		</Dropdown>
	)
}