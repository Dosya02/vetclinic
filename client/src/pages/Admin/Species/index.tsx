import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Loader, Table } from '@components';
import { useModal } from '@hooks';
import { SpeciesModel } from '@models';
import {
  useCreateSpeciesMutation,
  useDeleteSpeciesMutation,
  useGetSpeciesQuery,
  useUpdateSpeciesMutation,
} from '@store/api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  changeName,
  clearCurrentSpeciesId,
  resetFields,
  setCurrentSpeciesId,
  setSpecies,
} from '@store/reducers/species';
import { getErrorMessage } from '@helpers';
import { SpeciesModal } from './SpeciesModal';

const AdminSpecies: FC = () => {
  const dispatch = useAppDispatch();
  const species = useAppSelector(state => state.speciesReducer.species);

  const { data, isLoading } = useGetSpeciesQuery();
  const [createSpecies] = useCreateSpeciesMutation();
  const [updateSpecies] = useUpdateSpeciesMutation();
  const [deleteSpecies] = useDeleteSpeciesMutation();

  const createModal = useModal(false);
  const editModal = useModal(false);

  useEffect(() => {
    if (data?.species) {
      dispatch(setSpecies(data.species));
    }
  }, [data, dispatch]);

  const handleAddSpecies = () => {
    dispatch(resetFields());
    dispatch(clearCurrentSpeciesId());
    createModal.open();
  };

  const handleEdit = (item: SpeciesModel) => {
    dispatch(changeName(item.name));
    dispatch(setCurrentSpeciesId(item.id));
    editModal.open();
  };

  const handleDelete = async (item: SpeciesModel) => {
    if (window.confirm(`Удалить вид "${item.name}"?`)) {
      try {
        const response = await deleteSpecies({ id: item.id }).unwrap();
        toast.success(response.message);
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
    }
  };

  const handleCreateSubmit = async ({ name }: { name: string }) => {
    const response = await createSpecies({ name }).unwrap();
    toast.success(response.message);
  };

  const handleUpdateSubmit = async ({ id, name }: { id?: string; name: string }) => {
    if (!id) return;
    const response = await updateSpecies({ id, name }).unwrap();
    toast.success(response.message);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="c-admin__species">
      <div className="c-admin__heading">
        <h2 className="c-admin__title">Виды питомцев</h2>
        <Button
          className="c-admin__create-button"
          text="Add Species"
          onClick={handleAddSpecies}
        />
      </div>
      <Table
        className="c-admin__species-table"
        data={species}
        columns={[{ key: 'name', label: 'Название вида питомца' }]}
        noDataText="В базе нет ни одного вида питомца."
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={5}
      />
      <SpeciesModal
        isActive={createModal.isOpen}
        text="Добавить вид"
        onSubmit={handleCreateSubmit}
        closeFn={createModal.close}
      />
      <SpeciesModal
        isActive={editModal.isOpen}
        text="Редактировать вид"
        onSubmit={handleUpdateSubmit}
        closeFn={editModal.close}
      />
    </div>
  );
};

export default AdminSpecies;