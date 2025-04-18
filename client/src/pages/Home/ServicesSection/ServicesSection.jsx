import { Container, NavButton, Section, Title } from 'src/components'
import { SyringeIcon, BagVetPetIcon, ToothIcon } from 'src/assets'
import { ServiceCard } from './Card/Card'
import styles from './ServicesSection.module.css'

export const ServicesSection = () => {
	const services = [
		{
			name: 'Вакцинация',
			image: SyringeIcon,
			description: 'Вакцины играют решающую роль в защите ваших домашних животных от ряда предотвратимых заболеваний.',
		},
		{
			name: 'Домашняя консультация',
			image: BagVetPetIcon,
			description: 'Наши опытные ветеринары привносят свои знания и заботу в ваш дом, гарантируя, что ваш питомец получит первоклассную медицинскую помощь в знакомой обстановке.',
		},
		{
			name: 'Стоматологическая помощь',
			image: ToothIcon,
			description: 'Специализируясь на профилактике стоматологических проблем, мы производим чистку и лечения существующих заболеваний.',
		},
	]

	return (
		<Section className={styles.anotherClass} id='services'>
			<Container>
				<Title text='Услуги по уходу за домашними животными' />
				<div className={styles.servicesList}>
					{services.map((service, index) => <ServiceCard key={index} service={service} />)}
				</div>
				<div className={styles.buttonContainer}>
					<NavButton text='Другие услуги' to='/services' />
				</div>
			</Container>
		</Section>
	)
}