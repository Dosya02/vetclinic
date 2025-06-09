import { useState, type FC } from 'react'
import { Button, Loader, Table } from '@components/ui'
import styles from './styles.module.css'
import { useCreateServiceMutation, useDeleteServiceMutation, useGetServicesQuery, useUpdateServiceMutation } from '@store/api'
import { useBoolean, useInput } from '@hooks'
import type { ServiceModel } from '@models'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@utils/helpers'
import { ServicesModal } from './Modal'

const AdminServices: FC = () => {
	const { data, isFetching, isError, refetch } = useGetServicesQuery()
	const [createService] = useCreateServiceMutation()
	const [updateService] = useUpdateServiceMutation()
	const [deleteService] = useDeleteServiceMutation()

	const createModal = useBoolean(false)
	const editModal = useBoolean(false)
	const name = useInput('')
	const [currentId, setCurrentId] = useState<string | null>(null)

	const openCreateModal = () => {
		name.setValue('')
		setCurrentId(null)
		createModal.setTrue()
	}

	const openEditModal = (item: ServiceModel) => {
		name.setValue(item.name)
		setCurrentId(item.id)
		editModal.setTrue()
	}

	const handleDelete = async (item: ServiceModel) => {
		if (window.confirm(`Удалить услугу "${item.name}"?`)) {
			try {
				const { message } = await deleteService({ id: item.id }).unwrap()
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

		return await createService({ name: name.value }).unwrap()
	}

	const handleUpdateSubmit = async () => {
		if (!currentId) {
			return { message: 'Такой записи не существует.' }
		}

		if (!name.value.trim()) {
			return { message: 'Введите название.' }
		}

		return await updateService({ id: currentId, name: name.value }).unwrap()
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
					Услуги
				</h2>
				<Button
					className={styles.button}
					text="Добавить услугу"
					onClick={openCreateModal}
				/>
			</div>
			<Table
				className={styles.table}
				data={data?.services ?? []}
				columns={[{ key: 'name', label: 'Название' }]}
				noDataText="В базе нет ни одной услуги."
				onEdit={openEditModal}
				onDelete={handleDelete}
				itemsPerPage={5}
			/>
			<ServicesModal
				isActive={createModal.value}
				text="Добавить услугу"
				name={name.value}
				setName={name.setValue}
				onSubmit={handleCreateSubmit}
				closeFn={createModal.setFalse}
			/>
			<ServicesModal
				isActive={editModal.value}
				text="Редактировать услугу"
				name={name.value}
				setName={name.setValue}
				onSubmit={handleUpdateSubmit}
				closeFn={editModal.setFalse}
			/>
		</div>
	)
}

export default AdminServices