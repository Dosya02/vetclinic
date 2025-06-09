import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { GoogleMapImg } from '@assets/images'
import { Container, Icon, Image, Section } from '@components/ui'
import { ANCHORS, ICONS } from '@constants'
import styles from './styles.module.css'

export const Contacts: FC = () => {
	const { t } = useTranslation()

	return (
		<Section className={styles.contacts} id={ANCHORS.CONTACTS.id} alternate>
			<Container>
				<div className={styles.inner}>
					<div className={styles.content}>
						<h2 className={styles.title}>
							{t('contacts-title')}
						</h2>
						<ul className={styles.list}>
							<li className={styles.item}>
								<Icon className={styles.icon} name={ICONS.LOCATION} />
								<span className={styles.text}>
									{t('contacts-item-title-1')}
									<br />
									<span>{t('contacts-item-text-1-start')}</span>
									<br />
									<span>{t('contacts-item-text-1-end')}</span>
								</span>
							</li>
							<li className={styles.item}>
								<Icon className={styles.icon} name={ICONS.PHONE} />
								<span className={styles.text}>
									{t('contacts-item-title-2')}
									<br />
									<span>{t('contacts-item-text-2-start')}</span>
									<br />
									<span>{t('contacts-item-text-2-end')}</span>
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
}