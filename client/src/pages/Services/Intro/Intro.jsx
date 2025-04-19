import { ServicesIntroImg } from 'src/assets'
import { Container } from 'src/components'
import styles from './Intro.module.css'

export const Intro = () => {
	return (
		<section
			className={styles.intro}
			style={{ backgroundImage: `url(${ServicesIntroImg})` }}
		>
			<Container>
				<div className={styles.content}>
					<h1 className={styles.title}>Услуги</h1>
					<p className={styles.text}>
						Мы свяжем вас с нашей компетентной командой специалистов в области здравоохранения
					</p>
				</div>
			</Container>
		</section>
	)
}