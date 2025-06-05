import { FC } from 'react';
import { Button } from '@components';
import { useModal } from '@hooks';

const AdminBreeds: FC = () => {
  const createModal = useModal(false);

  const handleAddBreed = () => {
    createModal.open();
  };

  return (
    <div className="c-admin__breeds">
      <div className="c-admin__heading">
        <h2 className="c-admin__title">Породы питомцев</h2>
        <Button
          className="c-admin__create-button"
          text="Добавить породу"
          onClick={handleAddBreed}
        />
      </div>
    </div>
  );
};

export default AdminBreeds;