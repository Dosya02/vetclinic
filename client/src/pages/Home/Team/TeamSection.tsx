import { FC } from 'react';
import { Container, Section, Title } from '../../../components';
import { TeamImg1, TeamImg2, TeamImg3 } from '../../../assets/images';
import { TeamCard } from './Card/Card';
import styles from './TeamSection.module.css';

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
];

export const TeamSection: FC = () => (
  <Section className={styles.team} id="team">
    <Container>
      <div className={styles.inner}>
        <Title text="Познакомьтесь с нашей командой"/>
        <div className={styles.list}>
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
  </Section>
);
