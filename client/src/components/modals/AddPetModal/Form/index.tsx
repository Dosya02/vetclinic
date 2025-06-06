import { FC, FormEvent } from 'react';

export const AddPetModalForm: FC = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  };

  return (
    <form className="c-add-pet-modal__form" onSubmit={handleSubmit}>

    </form>
  );
};