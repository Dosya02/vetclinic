import { Container, Title } from 'src/components'
import { GoogleMapImage, LocationIcon, PhoneIcon } from 'src/assets'
import styles from './Top.module.css'

export const FooterTop = () => (
	<div className={styles.top}>
		<Container>
			<div className={styles.content}>
				<div className={styles.contacts}>
					<Title text='Контакты' align='left' />
					<div className={styles.contactsItem}>
						<div className={styles.icon}>
							<img src={LocationIcon} alt="location icon" />
						</div>
						<p className={styles.text}>
							Наш адрес:<br />
							<span>г. Алматы ул.</span><br />
							<span>Байтурсынова 125</span>
						</p>
					</div>
					<div className={styles.contactsItem}>
						<div className={styles.icon}>
							<img src={PhoneIcon} alt="phone icon" />
						</div>
						<p className={styles.text}>
							Ресепшн:<br />
							<span>+7 705 806 24 83</span><br />
							<span>+7 705 678 50 44</span>
						</p>
					</div>
				</div>
				<div className={styles.minimap}>
					<img src={GoogleMapImage} alt="google map" />
				</div>
			</div>
		</Container>
	</div>
)