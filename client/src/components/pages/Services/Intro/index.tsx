import type { FC } from 'react'
import styles from './styles.module.css'
import { ServicesIntroImg } from '@assets/images'
import { Container } from '@components/ui'

export const Intro: FC = () => (

	<section
		className={styles.intro}
		style={{ backgroundImage: `url(${ServicesIntroImg})` }}
	>
		<Container>
			<div className={styles.inner}>
				<h1 className={styles.title}>Услуги</h1>
				<p className={styles.text}>
					Мы свяжем вас с нашей компетентной командой специалистов в области
					здравоохранения
				</p>
			</div>
		</Container>
	</section>
)