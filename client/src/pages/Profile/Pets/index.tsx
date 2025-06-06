import { FC } from 'react';
import { PetModel } from '@models';
import { Link } from 'react-router-dom';
import { AddPetModal, PetCard } from '@components';
import { useBoolean } from '@hooks';

const ProfilePets: FC = () => {
  const pets: PetModel[] = [
    {
      id: 'pet1',
      name: 'Alex',
      speciesId: 'spc1',
      breedId: 'brd1',
    },
  ];

  const addPetModal = useBoolean(false);

  return (
    <div className="c-profile__pets">
      <ul className="c-profile__pets-list">
        {pets.map((pet: PetModel) => (
          <li key={pet.id} className="c-profile__pets-item">
            <Link className="c-profile__pets-link" to={'/'}>
              <PetCard pet={pet}/>
            </Link>
          </li>
        ))}
        <div className="c-profile__pets-add" onClick={addPetModal.setTrue}/>
      </ul>
      <AddPetModal
        isOpen={addPetModal.value}
        closeFn={addPetModal.setFalse}
      />
    </div>
  );
};

export default ProfilePets;