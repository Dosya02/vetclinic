import {
	ServicesIcon1,
	ServicesIcon2,
	ServicesIcon3,
	ServicesIcon4,
	ServicesIcon5,
	ServicesIcon6,
	ServicesIcon7,
	ServicesIcon8,
	ServicesIcon9,
	ServicesIcon10,
	ServicesImg1,
	ServicesImg2,
	ServicesImg3,
	ServicesImg4,
	ServicesImg5,
	ServicesImg6,
	ServicesImg7,
	ServicesImg8,
	ServicesImg9,
	ServicesImg10,
} from 'src/assets'
import { Container, Section } from 'src/components'
import { ServiceCard } from './ServiceCard/ServiceCard'
import { ServicesBanner } from './ServiceBanner/ServiceBanner'
import styles from './ServicesList.module.css'

export const ServicesList = () => {
	const services = [
		{
			name: 'Экстренный уход за домашними животными 24/7',
			icon: ServicesIcon1,
			image: null,
			description: 'Жизненно важная помощь 24/7.',
		},
		{
			name: 'Домашняя консультация',
			icon: ServicesIcon2,
			image: ServicesImg1,
			description: 'Наши опытные ветеринары привносят свои знания и заботу в ваш дом, гарантируя, что ваш питомец получит первоклассную медицинскую помощь в знакомой обстановке.',
		},
		{
			name: 'Экстренные визиты на дом',
			icon: ServicesIcon2,
			image: ServicesImg2,
			description: 'Предоставление жизненно важных услуг домашним животным, нуждающимся в срочной помощи, минимизация стресса и предоставление быстрой и спасительной помощи прямо у вашего порога.',
		},
		{
			name: 'Ультразвук',
			icon: ServicesIcon6,
			image: ServicesImg3,
			description: 'Эта процедура неинвазивной визуализации обеспечивает детальное изображение внутренних органов вашего питомца, оценку мягких тканей или скопления жидкости для постановки точного диагноза.',
		},
		{
			name: 'Микрочипирование',
			icon: ServicesIcon3,
			image: ServicesImg4,
			description: 'Чипирование вашего питомца является важной частью ухода за домашним животным, поскольку оно содержит важную идентификационную информацию о вашем питомце.',
		},
		{
			name: 'Ежегодный экзамен по благосостоянию',
			icon: ServicesIcon4,
			image: ServicesImg5,
			description: 'Ответственные владельцы домашних животных знают о важности регулярных осмотров для профилактики и обеспечения общего здоровья и долголетия ваших питомцев.',
		},
		{
			name: 'Рентгенология / Радиология',
			icon: ServicesIcon5,
			image: ServicesImg6,
			description: 'Рентгеновские лучи играют важную роль в ветеринарной помощи, позволяя заглянуть внутрь здоровья вашего питомца, помогая диагностировать то, что может быть незаметно снаружи.',
		},
		{
			name: 'Вакцинация',
			icon: ServicesIcon3,
			image: ServicesImg7,
			description: 'Вакцины играют решающую роль в защите ваших домашних животных от ряда предотвратимых заболеваний. Наша команда опытных ветеринаров в курсе последних событий и следует последним рекомендациям AAHA, чтобы проводить правильные прививки в нужное время.',
		},
		{
			name: 'Стерилизация и кастрация',
			icon: ServicesIcon7,
			image: ServicesImg8,
			description: 'Имеет решающее значение для благополучия вашего питомца, снижая риск проблем со здоровьем и поведенческих проблем и держа сообщество домашних животных под контролем.',
		},
		{
			name: 'Ортопедия',
			icon: ServicesIcon8,
			image: ServicesImg9,
			description: 'Важная роль в поддержании мобильности и комфорта вашего питомца. Ортопедическая помощь домашним животным включает в себя как хирургические, так и нехирургические вмешательства для восстановления, восстановления и поддержания здоровья опорно-двигательного аппарата.',
		},
		{
			name: 'Стоматологическая помощь',
			icon: ServicesIcon9,
			image: ServicesImg10,
			description: 'Специализируясь на профилактике стоматологических проблем, мы помогаем поддерживать оптимальное здоровье полости рта с помощью тщательного стоматологического осмотра, чистки и лечения существующих заболеваний.',
		},
		{
			name: 'Груминг домашних животных',
			icon: ServicesIcon10,
			image: ServicesImg10,
			description: 'Мы привлекаем опытных грумеров, чтобы обеспечить комфортный визит для вашего питомца. Вы можете выбрать из широкого спектра услуг, включая лечебную ванну, стрижку волос, ногти, выделение желез.',
		},
	]

	return (
		<Section>
			<Container>
				<div className={styles.content}>
					<ul className={styles.list}>
						{services.map((service, index) => (
							<li className={styles.item} key={index}>
								<ServiceCard service={service} />
							</li>
						))}
					</ul>
					<ServicesBanner />
				</div>
			</Container>
		</Section>

	)
}