import type { FC } from 'react'
import { GoogleMapImg } from '@assets/images'
import { Container, Icon, Image, Section } from '@components/ui'
import { ANCHORS, ICONS } from '@constants'
import styles from './styles.module.css'

export const Contacts: FC = () => (
	<Section className={styles.contacts} id={ANCHORS.CONTACTS.id} alternate>
		<Container>
			<div className={styles.inner}>
				<div className={styles.content}>
					<h2 className={styles.title}>
						Контакты
					</h2>
					<ul className={styles.list}>
						<li className={styles.item}>
							<Icon className={styles.icon} name={ICONS.LOCATION} />
							<span className={styles.text}>
								Наш адрес:
								<br />
								<span>г. Алматы</span>
								<br />
								<span>ул. Байтурсынова 125</span>
							</span>
						</li>
						<li className={styles.item}>
							<Icon className={styles.icon} name={ICONS.PHONE} />
							<span className={styles.text}>
								Ресепшн:
								<br />
								<span>+7 705 806 24 83</span>
								<br />
								<span>+7 705 678 50 44</span>
							</span>
						</li>
					</ul>
				</div>
				<div className={styles.image}>
					<Image
						src={GoogleMapImg}
						alt="google map"
					/>
				</div>
			</div>
		</Container>
	</Section>
)