import type { FC } from 'react'
import { Container, Logo } from '@components/ui'
import { LOGO_TYPES } from '@constants'
import styles from './styles.module.css'

export const PageFooter: FC = () => (
	<footer className={styles.footer}>
		<Container>
			<div className={styles.inner}>
				<Logo type={LOGO_TYPES.DARK} />
				<p className={styles.copyright}>
					© Все права защищены
				</p>
			</div>
		</Container>
	</footer>
)