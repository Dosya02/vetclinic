import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Table } from '@components';
import { useModal } from '@hooks';
import { SpeciesModel } from '@models';
import {
  useCreateSpeciesMutation,
  useDeleteSpeciesMutation,
  useGetSpeciesQuery,
  useUpdateSpeciesMutation,
} from '@store/api';
import { SpeciesModal } from './SpeciesModal';

const AdminSpecies: FC = () => {
  const { data } = useGetSpeciesQuery();
  const [createSpecies] = useCreateSpeciesMutation();
  const [updateSpecies] = useUpdateSpeciesMutation();
  const [deleteSpecies] = useDeleteSpeciesMutation();

  const createModal = useModal(false);
  const editModal = useModal(false);

  const [editData, setEditData] = useState<SpeciesModel | null>(null);

  const handleAddSpecies = () => {
    setEditData(null);
    createModal.open();
  };

  const handleEdit = (item: SpeciesModel) => {
    setEditData(item);
    editModal.open();
  };

  const handleDelete = async (item: SpeciesModel) => {
    if (window.confirm(`Удалить вид "${item.name}"?`)) {
      try {
        const response = await deleteSpecies({ id: item.id }).unwrap();
        toast.success(response.message);
      } catch (err) {
        toast.error('Ошибка при удалении вида');
      }
    }
  };

  const handleCreateSubmit = async ({ name }: { name: string }) => {
    const response = await createSpecies({ name }).unwrap();
    toast.success(response.message);
  };

  const handleUpdateSubmit = async ({ id, name }: {
    id?: string;
    name: string
  }) => {
    if (!id) {
      return;
    }
    const response = await updateSpecies({ id, name }).unwrap();
    toast.success(response.message);
  };

  const species = data?.species ?? [];

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
      />
      <SpeciesModal
        isActive={createModal.isOpen}
        closeFn={createModal.close}
        onSubmit={handleCreateSubmit}
      />
      <SpeciesModal
        isActive={editModal.isOpen}
        closeFn={editModal.close}
        onSubmit={handleUpdateSubmit}
        initialData={editData ?? undefined}
      />
    </div>
  );
};

export default AdminSpecies;