import { type FC, useState } from 'react'
import { toast } from 'react-toastify'
import type { DropdownOptionType } from '@constants'
import { useBoolean, useInput } from '@hooks'
import type { BreedModel } from '@models'
import {
	useCreateBreedMutation,
	useDeleteBreedMutation,
	useGetBreedsQuery,
	useGetSpeciesQuery,
	useUpdateBreedMutation,
} from '@store/api'
import { getErrorMessage } from '@utils/helpers'
import { BreedsModal } from './Modal'
import { Button, Loader, Table } from '@components/ui'
import styles from './styles.module.css'

const AdminBreeds: FC = () => {
	const {
		data: breedsData,
		isFetching: isBreedsFetching,
		isError: isBreedsError,
		refetch: refetchBreeds,
	} = useGetBreedsQuery()
	const {
		data: speciesData,
		isFetching: isSpeciesFetching,
		isError: isSpeciesError,
		refetch: refetchSpecies,
	} = useGetSpeciesQuery()

	const [createBreed] = useCreateBreedMutation()
	const [updateBreed] = useUpdateBreedMutation()
	const [deleteBreed] = useDeleteBreedMutation()

	const createModal = useBoolean(false)
	const editModal = useBoolean(false)

	const name = useInput('')
	const selectedSpeciesId = useInput('')

	const [currentId, setCurrentId] = useState<string | null>(null)

	const speciesOptions: DropdownOptionType[] =
		speciesData?.species.map((sp) => ({ id: sp.id, name: sp.name })) ?? []

	const openCreateModal = () => {
		name.setValue('')
		selectedSpeciesId.setValue('')
		setCurrentId(null)
		createModal.setTrue()
	}

	const openEditModal = (item: BreedModel & { speciesName?: string }) => {
		name.setValue(item.name)
		if ('speciesId' in item) {
			selectedSpeciesId.setValue(item.speciesId)
		} else {
			selectedSpeciesId.setValue('')
		}
		setCurrentId(item.id)
		editModal.setTrue()
	}

	const handleDelete = async (item: BreedModel) => {
		if (window.confirm(`Удалить породу "${item.name}"?`)) {
			try {
				const { message } = await deleteBreed({ id: item.id }).unwrap()
				toast.success(message)
			} catch (err) {
				toast.error(getErrorMessage(err))
			}
		}
	}

	const handleCreateSubmit = async () => {
		if (!name.value.trim()) {
			return { message: 'Введите название породы' }
		}

		if (!selectedSpeciesId.value) {
			return { message: 'Выберите вид питомца' }
		}

		return await createBreed({
			name: name.value,
			speciesId: selectedSpeciesId.value,
		}).unwrap()
	}

	const handleUpdateSubmit = async () => {
		if (!currentId) {
			return { message: '' }
		}
		if (!name.value.trim()) {
			toast.error('Введите название породы')
			return { message: '' }
		}
		if (!selectedSpeciesId.value) {
			toast.error('Выберите вид питомца')
			return { message: '' }
		}
		try {
			const response = await updateBreed({
				id: currentId,
				name: name.value,
				speciesId: selectedSpeciesId.value,
			}).unwrap()
			return response
		} catch (err) {
			toast.error(getErrorMessage(err))
			return { message: '' }
		}
	}

	if (isBreedsFetching || isSpeciesFetching) {
		return <Loader />
	}

	if (isBreedsError || isSpeciesError) {
		return (
			<div>
				Ошибка загрузки данных.
				<Button onClick={() => {
					refetchBreeds()
					refetchSpecies()
				}} text="Повторить" />
			</div>
		)
	}

	const tableData = breedsData?.breeds.map((breed: BreedModel) => {
		const species = speciesData?.species.find(sp => sp.id === breed.speciesId)
		return {
			...breed,
			speciesName: species?.name || '—',
		}
	}) ?? []

	return (
		<div className={styles.breeds}>
			<div className={styles.heading}>
				<h2 className={styles.title}>
					Породы питомцев
				</h2>
				<Button
					className={styles.button}
					text="Добавить породу"
					onClick={openCreateModal}
				/>
			</div>
			<Table
				className={styles.table}
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
				setName={name.setValue}
				selectedSpeciesId={selectedSpeciesId.value}
				setSelectedSpeciesId={selectedSpeciesId.setValue}
				speciesOptions={speciesOptions}
				onSubmit={handleCreateSubmit}
				closeFn={createModal.setFalse}
			/>
			<BreedsModal
				isActive={editModal.value}
				text="Редактировать породу"
				name={name.value}
				setName={name.setValue}
				selectedSpeciesId={selectedSpeciesId.value}
				setSelectedSpeciesId={selectedSpeciesId.setValue}
				speciesOptions={speciesOptions}
				onSubmit={handleUpdateSubmit}
				closeFn={editModal.setFalse}
			/>
		</div >
	)
}

export default AdminBreeds