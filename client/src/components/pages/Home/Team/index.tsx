import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Container, Section } from '@components/ui'
import { ANCHORS, USER_ROLES } from '@constants'
import type { UserModel } from '@models'
import { useGetAllUsersQuery } from '@store/api'
import { TeamCard } from './Card'
import styles from './styles.module.css'

const MIN_SLIDES_FOR_LOOP = 4

export const Team: FC = () => {
	const { t } = useTranslation()
	const { data } = useGetAllUsersQuery()

	const team = data?.users.filter(user => user.role === USER_ROLES.VET) ?? []

	return (
		<Section className={styles.team} id={ANCHORS.TEAM.id} alternate>
			<Container>
				<div className={styles.inner}>
					<h2 className={styles.title}>
						{t('team-title')}
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
						{team.map((member: UserModel) => (
							<SwiperSlide key={member.id}>
								<TeamCard member={member} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</Container>
		</Section>
	)
}