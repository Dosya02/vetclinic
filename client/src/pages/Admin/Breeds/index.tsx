import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Loader, Table } from '@components';
import { DropdownOption } from '@constants';
import { useBoolean, useInput } from '@hooks';
import { BreedModel, SpeciesModel } from '@models';
import {
  useCreateBreedMutation,
  useDeleteBreedMutation,
  useGetBreedsQuery,
  useGetSpeciesQuery,
  useUpdateBreedMutation,
} from '@store/api';
import { getErrorMessage } from '@helpers';
import { BreedsModal } from './BreedsModal';

const AdminBreeds: FC = () => {
  const {
    data: breedsData,
    isFetching: isBreedsFetching,
    isError: isBreedsError,
    refetch: refetchBreeds,
  } = useGetBreedsQuery();
  const {
    data: speciesData,
    isFetching: isSpeciesFetching,
    isError: isSpeciesError,
    refetch: refetchSpecies,
  } = useGetSpeciesQuery();

  const [createBreed] = useCreateBreedMutation();
  const [updateBreed] = useUpdateBreedMutation();
  const [deleteBreed] = useDeleteBreedMutation();

  const createModal = useBoolean(false);
  const editModal = useBoolean(false);

  const name = useInput('');
  const selectedSpeciesId = useInput('');

  const [currentId, setCurrentId] = useState<string | null>(null);

  // Формируем опции для Dropdown из species
  const speciesOptions: DropdownOption[] = speciesData?.species.map((sp: SpeciesModel) => (
    {
      value: sp.id,
      label: sp.name,
    }
  )) ?? [];

  const openCreateModal = () => {
    name.set('');
    selectedSpeciesId.set('');
    setCurrentId(null);
    createModal.setTrue();
  };

  const openEditModal = (item: BreedModel & { speciesName?: string }) => {
    name.set(item.name);
    if ('speciesId' in item) {
      selectedSpeciesId.set(item.speciesId);
    } else {
      selectedSpeciesId.set('');
    }
    setCurrentId(item.id);
    editModal.setTrue();
  };

  const handleDelete = async (item: BreedModel) => {
    if (window.confirm(`Удалить породу "${item.name}"?`)) {
      try {
        const { message } = await deleteBreed({ id: item.id }).unwrap();
        toast.success(message);
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
    }
  };

  const handleCreateSubmit = async () => {
    if (!name.value.trim()) {
      return { message: 'Введите название породы' };
    }

    if (!selectedSpeciesId.value) {
      return { message: 'Выберите вид питомца' };
    }

    return await createBreed({
      name: name.value,
      speciesId: selectedSpeciesId.value,
    }).unwrap();
  };

  const handleUpdateSubmit = async () => {
    if (!currentId) {
      return { message: '' };
    }
    if (!name.value.trim()) {
      toast.error('Введите название породы');
      return { message: '' };
    }
    if (!selectedSpeciesId.value) {
      toast.error('Выберите вид питомца');
      return { message: '' };
    }
    try {
      const response = await updateBreed({
        id: currentId,
        name: name.value,
        speciesId: selectedSpeciesId.value,
      }).unwrap();
      return response;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return { message: '' };
    }
  };

  if (isBreedsFetching || isSpeciesFetching) {
    return <Loader/>;
  }

  if (isBreedsError || isSpeciesError) {
    return (
      <div>
        Ошибка загрузки данных.
        <Button onClick={() => {
          refetchBreeds();
          refetchSpecies();
        }} text="Повторить"/>
      </div>
    );
  }

  // Таблица — выводим name и speciesName (speciesName возьмем из speciesData)
  const tableData = breedsData?.breeds.map((breed: BreedModel) => {
    const species = speciesData?.species.find(sp => sp.id === breed.speciesId);
    return {
      ...breed,
      speciesName: species?.name || '—',
    };
  }) ?? [];

  return (
    <div className="c-admin__breeds">
      <div className="c-admin__heading">
        <h2 className="c-admin__title">Породы питомцев</h2>
        <Button
          className="c-admin__create-button"
          text="Добавить породу"
          onClick={openCreateModal}
        />
      </div>
      <Table
        className="c-admin__breeds-table"
        data={tableData}
        columns={[
          { key: 'name', label: 'Название' },
          { key: 'speciesName', label: 'Вид питомца' },
        ]}
        noDataText="В базе нет ни одной породы питомца."
        onEdit={openEditModal}
        onDelete={handleDelete}
        itemsPerPage={10}
      />
      <BreedsModal
        isActive={createModal.value}
        text="Добавить породу"
        name={name.value}
        setName={name.set}
        selectedSpeciesId={selectedSpeciesId.value}
        setSelectedSpeciesId={selectedSpeciesId.set}
        speciesOptions={speciesOptions}
        onSubmit={handleCreateSubmit}
        closeFn={createModal.setFalse}
      />
      <BreedsModal
        isActive={editModal.value}
        text="Редактировать породу"
        name={name.value}
        setName={name.set}
        selectedSpeciesId={selectedSpeciesId.value}
        setSelectedSpeciesId={selectedSpeciesId.set}
        speciesOptions={speciesOptions}
        onSubmit={handleUpdateSubmit}
        closeFn={editModal.setFalse}
      />
    </div>
  );
};

export default AdminBreeds;
