import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Section } from '@components/ui'
import { ANCHORS, ICONS, ROUTES } from '@constants'
import { ServicesCard } from './Card'
import styles from './styles.module.css'

const services = [
	{
		name: 'Вакцинация',
		icon: ICONS.SYRINGE,
		description: 'Вакцины играют решающую роль в защите ваших домашних животных от ряда предотвратимых заболеваний.',
	},
	{
		name: 'Домашняя консультация',
		icon: ICONS.PET_BAG,
		description: 'Наши опытные ветеринары привносят свои знания и заботу в ваш дом, гарантируя, что ваш питомец получит первоклассную медицинскую помощь в знакомой обстановке.',
	},
	{
		name: 'Стоматологическая помощь',
		icon: ICONS.TOOTH,
		description: 'Специализируясь на профилактике стоматологических проблем, мы производим чистку и лечения существующих заболеваний.',
	},
]

export const Services: FC = () => {
	const navigate = useNavigate()

	const handleClick = () => navigate(ROUTES.SERVICES)

	return (
		<Section className={styles.services} id={ANCHORS.SERVICES.id}>
			<Container>
				<div className={styles.inner}>
					<h2 className={styles.title}>
						Услуги по уходу за домашними животными
					</h2>
					<ul className={styles.list}>
						{services.map((service, index) => (
							<li className={styles.item} key={index}>
								<ServicesCard  {...service} />
							</li>
						))}
					</ul>
					<Button
						text="Другие услуги"
						onClick={handleClick}
					/>
				</div>
			</Container>
		</Section>
	)
}