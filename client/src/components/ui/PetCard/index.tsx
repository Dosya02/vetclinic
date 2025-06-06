import { FC } from 'react';
import { PetAvatarImg } from '@images';
import { Image } from '@components';
import { PetModel } from '@models';

interface Props {
  pet: PetModel;
}

export const PetCard: FC<Props> = ({ pet }) => (
  <article className="c-pet-card">
    <Image
      className="c-pet-card__image"
      src={pet.imageUrl ?? PetAvatarImg}
      alt="pet image"
    />
    <h6 className="c-pet-card__title">
      {pet.name}
    </h6>
  </article>
);