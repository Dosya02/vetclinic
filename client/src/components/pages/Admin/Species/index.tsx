import { useState, type FC } from 'react'
import { toast } from 'react-toastify'
import { Button, Loader, Table } from '@components/ui'
import { useBoolean, useInput } from '@hooks'
import type { SpeciesModel } from '@models'
import {
	useCreateSpeciesMutation,
	useDeleteSpeciesMutation,
	useGetSpeciesQuery,
	useUpdateSpeciesMutation,
} from '@store/api'
import { getErrorMessage } from '@utils/helpers'
import { SpeciesModal } from './Modal'
import styles from './styles.module.css'

const AdminSpecies: FC = () => {
	const { data, isFetching, isError, refetch } = useGetSpeciesQuery()
	const [createSpecies] = useCreateSpeciesMutation()
	const [updateSpecies] = useUpdateSpeciesMutation()
	const [deleteSpecies] = useDeleteSpeciesMutation()

	const createModal = useBoolean(false)
	const editModal = useBoolean(false)
	const name = useInput('')
	const [currentId, setCurrentId] = useState<string | null>(null)

	const openCreateModal = () => {
		name.setValue('')
		setCurrentId(null)
		createModal.setTrue()
	}

	const openEditModal = (item: SpeciesModel) => {
		name.setValue(item.name)
		setCurrentId(item.id)
		editModal.setTrue()
	}

	const handleDelete = async (item: SpeciesModel) => {
		if (window.confirm(`Удалить вид "${item.name}"?`)) {
			try {
				const { message } = await deleteSpecies({ id: item.id }).unwrap()
				toast.success(message)
			} catch (err) {
				toast.error(getErrorMessage(err))
			}
		}
	}

	const handleCreateSubmit = async () => {
		if (!name.value.trim()) {
			return { message: 'Введите название' }
		}

		return await createSpecies({ name: name.value }).unwrap()
	}

	const handleUpdateSubmit = async () => {
		if (!currentId) {
			return { message: 'Такой записи не существует.' }
		}

		if (!name.value.trim()) {
			return { message: 'Введите название.' }
		}

		return await updateSpecies({ id: currentId, name: name.value }).unwrap()
	}

	if (isFetching) {
		return <Loader />
	}

	if (isError) {
		return (
			<div>
				Ошибка загрузки данных.
				<Button text="Повторить" onClick={() => refetch()} />
			</div>
		)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.heading}>
				<h2 className={styles.title}>
					Виды питомцев
				</h2>
				<Button
					className={styles.button}
					text="Добавить вид"
					onClick={openCreateModal}
				/>
			</div>
			<Table
				className={styles.table}
				data={data?.species ?? []}
				columns={[{ key: 'name', label: 'Название' }]}
				noDataText="В базе нет ни одного вида питомца."
				onEdit={openEditModal}
				onDelete={handleDelete}
				itemsPerPage={5}
			/>
			<SpeciesModal
				isActive={createModal.value}
				text="Добавить вид"
				name={name.value}
				setName={name.setValue}
				onSubmit={handleCreateSubmit}
				closeFn={createModal.setFalse}
			/>
			<SpeciesModal
				isActive={editModal.value}
				text="Редактировать вид"
				name={name.value}
				setName={name.setValue}
				onSubmit={handleUpdateSubmit}
				closeFn={editModal.setFalse}
			/>
		</div>
	)
}

export default AdminSpecies