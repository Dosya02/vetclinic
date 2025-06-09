import { useState, type FC } from 'react'
import { Button, Loader, Table } from '@components/ui'
import { useCreateVetMutation, useGetAllUsersQuery } from '@store/api'
import { USER_ROLES } from '@constants'
import { AdminVetsModal } from './Modal'
import { useActions, useBoolean, useEmail, useInput, usePassword } from '@hooks'
import { validateEmail, validatePassword } from '@utils/validators'
import styles from './styles.module.css'

const AdminVets: FC = () => {
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [initialPreviewUrl, setInitialPreviewUrl] = useState<string | null>(null)

	const handleImageUpload = (file: File) => {
		setImageFile(file)
		setInitialPreviewUrl(null)
	}

	const { email, onEmailChange } = useEmail()
	const { password, onPasswordChange } = usePassword()
	const firstName = useInput('')
	const lastName = useInput('')
	const [positions, setPositions] = useState<string[]>([])

	const { resetAuthFields } = useActions()

	const { data, isFetching, isError, refetch } = useGetAllUsersQuery()
	const [createVet] = useCreateVetMutation()

	const createModal = useBoolean(false)

	const vets = data?.users.filter(
		user => user.role === USER_ROLES.VET
	) ?? []

	const openCreateModal = () => {
		createModal.setTrue()
	}

	const handleCreateSubmit = async () => {
		const emailError = validateEmail(email)
		const passwordError = validatePassword(password)

		if (emailError) {
			return { message: emailError }
		}

		if (passwordError) {
			return { message: passwordError }
		}

		if (!firstName.value.trim()) {
			return { message: 'Введите имя' }
		}

		if (!lastName.value) {
			return { message: 'Введите фамилию' }
		}

		if (!imageFile) {
			return { message: 'Пожалуйста, загрузите фото' }
		}

		if (positions.length === 0) {
			return { message: 'Укажите хотя бы одну должность' }
		}

		const formData = new FormData()
		formData.append('email', email)
		formData.append('password', password)
		formData.append('firstName', firstName.value)
		formData.append('lastName', lastName.value)
		positions.forEach(position => formData.append('positions', position))
		formData.append('image', imageFile)

		await createVet(formData).unwrap()

		await refetch()

		setImageFile(null)
		setInitialPreviewUrl(null)
		resetAuthFields()
		firstName.setValue('')
		lastName.setValue('')
		setPositions([])

		return { message: 'Ветеринар успешно создан' }
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
					Ветеринары
				</h2>
				<Button
					className={styles.button}
					text="Добавить врача"
					onClick={openCreateModal}
				/>
			</div>
			<Table
				className={styles.table}
				data={vets}
				columns={[
					{ key: 'firstName', label: 'Имя' },
					{ key: 'lastName', label: 'Фамилия' },
					{ key: 'email', label: 'Почта' }
				]}
				noDataText="В базе нет ни одного ветеринара."
				onEdit={() => { }}
				onDelete={() => { }}
				itemsPerPage={5}
			/>
			<AdminVetsModal
				isActive={createModal.value}
				text="Добавить ветеринара"
				onSubmit={handleCreateSubmit}
				closeFn={createModal.setFalse}
				email={email}
				password={password}
				firstName={firstName.value}
				lastName={lastName.value}
				positions={positions}
				initialPreviewUrl={initialPreviewUrl}
				handleImageUpload={handleImageUpload}
				onEmailChange={onEmailChange}
				onPasswordChange={onPasswordChange}
				onFirstNameChange={firstName.onChange}
				onLastNameChange={lastName.onChange}
				setPositions={setPositions}
			/>
		</div>
	)
}

export default AdminVets