import { FC, useMemo } from 'react';
import { Button, Loader, Table } from '@components';
import { useActions, useModal } from '@hooks';
import { BreedModel } from '@models';
import {
  useCreateBreedMutation,
  useDeleteBreedMutation,
  useUpdateBreedMutation,
} from '@store/api';
import { useAppSelector } from '@store/hooks';
import { BreedsModal } from './BreedsModal';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@helpers';

const AdminBreeds: FC = () => {
  const { breeds, isLoading } = useAppSelector(state => state.breedsReducer);
  const species = useAppSelector(state => state.speciesReducer.species);

  const {
    changeBreedName,
    changeBreedSpeciesId,
    clearCurrentBreedId,
    resetBreedsFields,
    setCurrentBreedId,
  } = useActions();

  const [createBreed] = useCreateBreedMutation();
  const [updateBreed] = useUpdateBreedMutation();
  const [deleteBreed] = useDeleteBreedMutation();

  const createModal = useModal(false);
  const editModal = useModal(false);

  const handleAddBreed = () => {
    resetBreedsFields();
    clearCurrentBreedId();
    createModal.open();
  };

  const handleEdit = (item: BreedModel) => {
    changeBreedName(item.name);
    changeBreedSpeciesId(item.speciesId);
    setCurrentBreedId(item.id);
    editModal.open();
  };

  const handleDelete = async (item: BreedModel) => {
    if (window.confirm(`Удалить породу "${item.name}"?`)) {
      try {
        const response = await deleteBreed({ id: item.id }).unwrap();
        toast.success(response.message);
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
    }
  };

  const handleCreateSubmit = async ({
    name,
    speciesId,
  }: {
    name: string;
    speciesId: string;
  }) => {
    const response = await createBreed({ name, speciesId }).unwrap();
    toast.success(response.message);
  };

  const handleUpdateSubmit = async ({
    id,
    name,
    speciesId,
  }: {
    id?: string;
    name: string;
    speciesId: string;
  }) => {
    if (!id) {
      return;
    }
    const response = await updateBreed({ id, name, speciesId }).unwrap();
    toast.success(response.message);
  };

  const tableData = useMemo(() => {
    return breeds.map(breed => {
      const speciesName = species.find(s => s.id === breed.speciesId)?.name ||
                          '—';
      return {
        ...breed,
        speciesName,
      };
    });
  }, [breeds, species]);

  console.log(tableData);

  if (isLoading) {
    return <Loader/>;
  }

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
      <Table
        className="c-admin__breeds-table"
        data={tableData}
        columns={[
          { key: 'name', label: 'Название' },
          { key: 'speciesName', label: 'Вид' },
        ]}
        noDataText="В базе нет ни одной породы."
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={5}
      />
      <BreedsModal
        isActive={createModal.isOpen}
        text="Добавить породу"
        onSubmit={handleCreateSubmit}
        closeFn={createModal.close}
      />
      <BreedsModal
        isActive={editModal.isOpen}
        text="Редактировать породу"
        onSubmit={handleUpdateSubmit}
        closeFn={editModal.close}
      />
    </div>
  );
};

export default AdminBreeds;