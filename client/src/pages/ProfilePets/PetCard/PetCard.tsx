import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IPet } from '../../../api/models';
import { generateSlug } from '../../../utils';
import styles from './PetCard.module.css';

interface Props {
  pet: IPet;
}

export const PetCard: FC<Props> = ({ pet }) => {
  const link = `${generateSlug(pet.name)}-${pet.id}`;
  
  return (
    <li className={styles.item}>
      <Link className={styles.link} to={link}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={pet.imageUrl}
            alt={pet.name}
          />
        </div>
        <h6 className={styles.title}>{pet.name}</h6>
      </Link>
    </li>
  );
};