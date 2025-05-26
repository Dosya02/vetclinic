import { FC } from 'react';
import { DogImg } from '@images';
import { BackButton } from '@components';
import { PetAvatar } from './PetAvatar/PetAvatar';
import { PetInfo } from './PetInfo/PetInfo';
import { PetAppointments } from './PetAppointments/PetAppointments';
import { PetVaccinations } from './PetVaccinations/PetVaccinations';
import styles from './PetDetails.module.css';

export const PetDetails: FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <BackButton
        className={styles.backButton}
        to="back"
        text="Назад к питомцам"
      />
      <PetAvatar imageUrl={DogImg}/>
      <PetInfo
        name="Лайка"
        type="dog"
      />
      <div className={styles.content}>
        <PetAppointments/>
        <PetVaccinations/>
      </div>
    </div>
  </div>
);
