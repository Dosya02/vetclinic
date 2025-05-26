import { FC } from 'react';
import { Link } from 'react-router-dom';
import { DogImg, RabbitImg } from '@images';
import { IPet } from '@models';
import { PetCard } from './PetCard/PetCard';
import styles from './ProfilePets.module.css';

const pets: IPet[] = [
  {
    id: '1',
    name: 'Лайка',
    type: 'dog',
    imageUrl: DogImg,
  },
  {
    id: '2',
    name: 'Бэнни',
    type: 'rabbit',
    imageUrl: RabbitImg,
  },
];

export const ProfilePets: FC = () => (
  <div className={styles.wrapper}>
    <ul className={styles.list}>
      {pets.map(pet => <PetCard key={pet.id} pet={pet}/>)}
      <li className={styles.item}>
        <Link className={styles.link} to=""/>
      </li>
    </ul>
  </div>
);