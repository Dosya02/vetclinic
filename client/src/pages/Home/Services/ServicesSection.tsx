import { FC } from 'react';
import { Container, NavButton, Section, Title } from '../../../components';
import { BagIcon, SyringeIcon, ToothIcon } from '../../../assets/images';
import { pageConfig } from '../../../config';
import { ServiceCard } from './Card/Card';
import styles from './ServicesSection.module.css';

const services = [
  {
    name: 'Вакцинация',
    image: SyringeIcon,
    description: 'Вакцины играют решающую роль в защите ваших домашних животных от ряда предотвратимых заболеваний.',
  },
  {
    name: 'Домашняя консультация',
    image: BagIcon,
    description: 'Наши опытные ветеринары привносят свои знания и заботу в ваш дом, гарантируя, что ваш питомец получит первоклассную медицинскую помощь в знакомой обстановке.',
  },
  {
    name: 'Стоматологическая помощь',
    image: ToothIcon,
    description: 'Специализируясь на профилактике стоматологических проблем, мы производим чистку и лечения существующих заболеваний.',
  },
];

export const ServicesSection: FC = () => (
  <Section id="services">
    <Container>
      <Title text="Услуги по уходу за домашними животными"/>
      <div className={styles.list}>
        {services.map((service, index) =>
          <ServiceCard key={index} {...service} />,
        )}
      </div>
      <div className={styles.buttonWrapper}>
        <NavButton to={pageConfig.services} title="Другие услуги"/>
      </div>
    </Container>
  </Section>
);