import { TeamImg1, TeamImg2, TeamImg3 } from 'src/assets'
import { Container, Title } from 'src/components'
import { TeamCard } from './Card/Card'
import styles from './TeamSection.module.css'

export const TeamSection = () => {
	const team = [
		{
			name: 'Максим Лавров',
			image: TeamImg1,
			position: 'Ветеринарный врач, хирург, ортопед, невролог',
		},
		{
			name: 'Алла Пугачева',
			image: TeamImg2,
			position: 'Ветеринарный врач, анестезиолог, онколог',
		},
		{
			name: 'Антон Львович',
			image: TeamImg3,
			position: 'Ветеринарный врач, хирург, эктозотолог, врач интенсивной терапии',
		},
	]

	return (
		<section className={styles.team}>
			<Container>
				<div className={styles.content}>
					<Title text='Познакомьтесь с нашей командой' align='center' />
					<div className={styles.teamList}>
						{team.map((doctor, index) => (
							<TeamCard
								key={index}
								name={doctor.name}
								image={doctor.image}
								position={doctor.position}
							/>
						))}
					</div>
				</div>
			</Container>
		</section>
	)
}