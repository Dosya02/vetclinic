import { useEffect, useState, type FC, type FormEvent } from 'react'
import { AppointmentPicker, DropdownWithLabel, Input, Textarea } from '@components/form'
import { Button } from '@components/ui'
import { USER_ROLES } from '@constants'
import { useDropdown, useInput } from '@hooks'
import type { UserModel } from '@models'
import {
	useGetAllUsersQuery,
	useGetServicesQuery,
	useGetSpeciesQuery,
} from '@store/api'
import styles from './styles.module.css'

export const GuestForm: FC = () => {
	const fullName = useInput('')
	const petName = useInput('')
	const address = useInput('')
	const comment = useInput('')

	const speciesQuery = useGetSpeciesQuery()
	const speciesOptions = speciesQuery.data?.species.map((s) => ({
		id: s.id,
		name: s.name,
	})) ?? []
	const speciesDropdown = useDropdown('', speciesOptions)

	const servicesQuery = useGetServicesQuery()
	const servicesOptions = servicesQuery.data?.services.map((s) => ({
		id: s.id,
		name: s.name,
	})) ?? []
	const servicesDropdown = useDropdown('', servicesOptions)

	let isAddress: boolean = false

	if (servicesDropdown.selectedOption?.name === 'Врач на дом') {
		isAddress = true
	}

	const users = useGetAllUsersQuery()
	const vetsOptions = users.data?.users.filter((user: UserModel) => user.role === USER_ROLES.VET).map((v) => ({
		id: v.id,
		name: `${v.firstName} ${v.lastName}`
	})) ?? []
	const vetsDropdown = useDropdown('', vetsOptions)

	const [selectedVetId, setSelectedVetId] = useState<string>('')
	const [busySlots, setBusySlots] = useState<string[]>([])
	const [selectedDateTime, setSelectedDateTime] = useState<string>('')

	useEffect(() => {
		const vetId = vetsDropdown.selectedOption?.id
		if (!vetId) {
			setBusySlots([])
			setSelectedVetId('')
			return
		}

		setSelectedVetId(vetId)
	}, [vetsDropdown.selectedOption?.id])

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
	}



	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.field}>
				<Input
					value={fullName.value}
					onChange={fullName.onChange}
					placeholder="Введите ФИО"
					label="ФИО"
					showLabel
				/>
			</div>
			<div className={styles.field}>
				<Input
					value={petName.value}
					onChange={petName.onChange}
					placeholder="Введите имя питомца"
					label="Имя питомца"
					showLabel
				/>
			</div>
			<div className={styles.field}>
				<DropdownWithLabel
					label="Вид"
					options={speciesOptions}
					onChange={speciesDropdown.onChange}
					selectedOption={speciesDropdown.selectedOption}
					placeholder="Выберите вид питомца"
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
				text="Записаться"
				type="submit"
			/>
		</form>
	)
}