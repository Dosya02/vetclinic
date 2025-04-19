import { ServicesBannerImg } from 'src/assets'
import { NavButton } from 'src/components'
import styles from './ServiceBanner.module.css'

export const ServicesBanner = () => (
	<div className={styles.banner}>
		<div className={styles.textBlock}>
			<h4 className={styles.title}>
				Запишитесь на приём сегодня
			</h4>
			<NavButton text='Записаться' to='/appointment' />
		</div>
		<div className={styles.imageBlock}>
			<img
				className={styles.image}
				src={ServicesBannerImg}
				alt="services banner"
			/>
		</div>
	</div>
)