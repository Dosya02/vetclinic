import type { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { DoctorImg1, DoctorImg2, DoctorImg3 } from '@assets/images'
import { Container, Section } from '@components/ui'
import { ANCHORS, USER_ROLES } from '@constants'
import type { VetModel } from '@models'
import { TeamCard } from './Card'
import styles from './styles.module.css'

const team: VetModel[] = [
	{
		id: 'team1',
		email: 'maksim.lavrov@gmail.com',
		role: USER_ROLES.VET,
		firstname: 'Максим',
		lastname: 'Лавров',
		positions: [
			'ветеринарный врач',
			'хирург',
			'ортопед',
			'невролог',
		],
		imageUrl: DoctorImg1,
	},
	{
		id: 'team2',
		email: 'alla.pugacheva@gmail.com',
		role: USER_ROLES.VET,
		firstname: 'Алла',
		lastname: 'Пугачева',
		positions: [
			'ветеринарный врач',
			'анестезиолог',
			'онколог',
		],
		imageUrl: DoctorImg2,
	},
	{
		id: 'team3',
		email: 'anton.lvovich@gmail.com',
		role: USER_ROLES.VET,
		firstname: 'Антон',
		lastname: 'Львович',
		positions: [
			'ветеринарный врач',
			'хирург',
			'эктозотолог',
			'врач интенсивной терапии',
		],
		imageUrl: DoctorImg3,
	},
]

const MIN_SLIDES_FOR_LOOP = 4

export const Team: FC = () => (
	<Section className={styles.team} id={ANCHORS.TEAM.id} alternate>
		<Container>
			<div className={styles.inner}>
				<h2 className={styles.title}>
					Познакомьтесь с нашей командой
				</h2>
				<Swiper
					modules={[Autoplay]}
					spaceBetween={45}
					slidesPerView={3}
					loop={team.length >= MIN_SLIDES_FOR_LOOP}
					autoplay={{
						delay: 2000,
						disableOnInteraction: false,
					}}
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 15,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 45,
						},
					}}
				>
					{team.map((member: VetModel) => (
						<SwiperSlide key={member.id}>
							<TeamCard member={member} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</Container>
	</Section>
)