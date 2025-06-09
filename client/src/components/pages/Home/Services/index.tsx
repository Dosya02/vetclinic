import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Section } from '@components/ui'
import { ANCHORS, ICONS, ROUTES } from '@constants'
import { ServicesCard } from './Card'
import styles from './styles.module.css'
import { useTranslation } from 'react-i18next'



export const Services: FC = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const handleClick = () => navigate(ROUTES.SERVICES)

	const services = [
		{
			name: t('home-services-card-title-1'),
			icon: ICONS.SYRINGE,
			description: t('home-services-card-text-1'),
		},
		{
			name: t('home-services-card-title-2'),
			icon: ICONS.PET_BAG,
			description: t('home-services-card-text-2'),
		},
		{
			name: t('home-services-card-title-3'),
			icon: ICONS.TOOTH,
			description: t('home-services-card-text-3'),
		},
	]

	return (
		<Section className={styles.services} id={ANCHORS.SERVICES.id}>
			<Container>
				<div className={styles.inner}>
					<h2 className={styles.title}>
						{t('home-services-title')}
					</h2>
					<ul className={styles.list}>
						{services.map((service, index) => (
							<li className={styles.item} key={index}>
								<ServicesCard  {...service} />
							</li>
						))}
					</ul>
					<Button
						text={t('home-services-button')}
						onClick={handleClick}
					/>
				</div>
			</Container>
		</Section>
	)
}