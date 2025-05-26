import { FC } from 'react';
import { HomeIntroImg } from '../../../assets/images';
import { Container, NavButton } from '../../../components';
import { pageConfig } from '../../../config';
import styles from './IntroSection.module.css';

export const IntroSection: FC = () => (
  <section
    className={styles.intro}
    style={{ backgroundImage: `url(${HomeIntroImg})` }}
    id="intro"
  >
    <Container>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Вашему любимцу всегда окажут помощь
        </h1>
        <div className={styles.buttonContainer}>
          <NavButton to={pageConfig.appointment} title="Записаться"/>
        </div>
      </div>
    </Container>
  </section>
);