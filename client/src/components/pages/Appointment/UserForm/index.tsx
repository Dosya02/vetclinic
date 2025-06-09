import { useState, type FC, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
	AppointmentPicker,
	DropdownWithImage,
	DropdownWithLabel,
	Input,
	Textarea,
} from '@components/form'
import { Button } from '@components/ui'
import { ROUTES, USER_ROLES } from '@constants'
import { useAppSelector, useDropdown, useInput } from '@hooks'
import {
	useCreateAppointmentMutation,
	useGetAllAppointmentsQuery,
	useGetAllUsersQuery,
	useGetPetsQuery,
	useGetServicesQuery,
} from '@store/api'
import { getErrorMessage } from '@utils/helpers'
import styles from './styles.module.css'

export const UserForm: FC = () => {
	const navigate = useNavigate()
	const address = useInput('')
	const comment = useInput('')

	const userInfo = useAppSelector(state => state.authReducer.userInfo)

	const users = useGetAllUsersQuery()
	const vetsOptions = users.data?.users?.filter(
		(user) => user.role === USER_ROLES.VET).map((v) => ({
			id: v.id,
			name: `${v.firstName} ${v.lastName}`,
		})) ?? []
	const vetsDropdown = useDropdown('', vetsOptions)
	const vetId = vetsDropdown.selectedOption?.id

	const pets = useGetPetsQuery()
	const petsOptions = pets.data?.pets.filter(
		(pet) => pet.ownerId === userInfo?.id).map((p) => ({
			id: p.id,
			name: p.name,
			imageUrl: p.imageUrl,
		})) ?? []
	const petsDropdown = useDropdown('', petsOptions)

	const servicesQuery = useGetServicesQuery()
	const servicesOptions = servicesQuery.data?.services.map((s) => ({
		id: s.id,
		name: s.name,
	})) ?? []
	const servicesDropdown = useDropdown('', servicesOptions)

	const isAddress = servicesDropdown.selectedOption?.name === 'Врач на дом'

	const appointmentsQuery = useGetAllAppointmentsQuery()
	const allAppointments = appointmentsQuery.data?.appointments ?? []

	const busySlots = vetId
		? allAppointments
			.filter((appointment) => appointment.vetId === vetId)
			.map((appointment) => appointment.datetime)
		: []

	const [selectedDateTime, setSelectedDateTime] = useState<string>('')

	const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()

		if (
			!userInfo?.id ||
			!petsDropdown.selectedOption?.id ||
			!servicesDropdown.selectedOption?.id ||
			!vetId ||
			!selectedDateTime
		) {
			toast.error('Пожалуйста, заполните все обязательные поля');
			return;
		}

		const formData = new FormData()
		formData.append('userId', userInfo.id)
		formData.append('petId', petsDropdown.selectedOption.id)
		formData.append('serviceId', servicesDropdown.selectedOption.id)
		if (isAddress) formData.append('address', address.value)
		formData.append('vetId', vetId)
		formData.append('datetime', selectedDateTime)
		if (comment.value) formData.append('comment', comment.value)

		try {
			const response = await createAppointment(formData).unwrap()

			toast.success(response.message)

			address.setValue('')
			comment.setValue('')
			petsDropdown.reset()
			servicesDropdown.reset()
			vetsDropdown.reset()
			setSelectedDateTime('')
			navigate(ROUTES.HOME)
		} catch (err) {
			toast.error(getErrorMessage(err))
			console.error(err);
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.field}>
				<DropdownWithImage
					label="Питомец"
					options={petsOptions}
					onChange={petsDropdown.onChange}
					selectedOption={petsDropdown.selectedOption}
					placeholder="Выберите питомца"
				/>
			</div>
			<div className={styles.field}>
				<DropdownWithLabel
					label="Услуга"
					options={servicesOptions}
					onChange={servicesDropdown.onChange}
					selectedOption={servicesDropdown.selectedOption}
					placeholder="Выберите услугу"
				/>
			</div>
			{isAddress && (
				<div className={styles.field}>
					<Input
						value={address.value}
						onChange={address.onChange}
						placeholder="Введите свой адрес"
						label="Адрес"
						showLabel
					/>
				</div>
			)}
			<div className={styles.field}>
				<DropdownWithLabel
					label="Врач"
					options={vetsOptions}
					onChange={vetsDropdown.onChange}
					selectedOption={vetsDropdown.selectedOption}
					placeholder="Выберите услугу"
				/>
			</div>
			<div className={styles.field}>
				<AppointmentPicker
					busySlots={busySlots}
					onSelect={(datetime: string) => setSelectedDateTime(datetime)}
				/>
			</div>
			<div className={styles.field}>
				<Textarea
					value={comment.value}
					onChange={comment.onChange}
					placeholder="Напишите свой комментарий"
					label="Комментарий"
					showLabel
				/>
			</div>
			<Button
				className={styles.button}
				text={isLoading ? 'Записываем...' : 'Записаться'}
				type="submit"
			/>
		</form>
	)
}