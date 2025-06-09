import { useEffect, useState, type FC, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import {
	DateDropdown,
	DropdownWithLabel,
	FeaturesInput,
	ImageDropzone,
	Input,
	Radio,
} from '@components/form'
import { Button } from '@components/ui'
import { GENDERS, type GenderType } from '@constants'
import {
	useAppSelector,
	useDropdown,
	useInput,
	useStructuredDate,
} from '@hooks'
import type { PetModel } from '@models'
import {
	useCreatePetMutation,
	useGetBreedsQuery,
	useGetSpeciesQuery,
	useUpdatePetMutation,
} from '@store/api'

import { getErrorMessage } from '@utils/helpers'
import styles from './styles.module.css'

interface PetModalFormProps {
	closeFn: () => void
	petToEdit?: PetModel
}

export const PetModalForm: FC<PetModalFormProps> = ({
	closeFn,
	petToEdit,
}) => {
	const isEdit = Boolean(petToEdit)

	const name = useInput('')
	const birthDate = useStructuredDate()
	const [gender, setGender] = useState<GenderType>(GENDERS.MALE)
	const [features, setFeatures] = useState<string[]>([])
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [initialPreviewUrl, setInitialPreviewUrl] = useState<string | null>(null)

	useEffect(() => {
		if (!petToEdit) {
			setInitialPreviewUrl(null)
			setImageFile(null)
			return
		}

		setInitialPreviewUrl(petToEdit.imageUrl ?? null)
		setImageFile(null)

		name.setValue(petToEdit.name)
		birthDate.set(petToEdit.birthDate)
		setGender(petToEdit.gender)
		setFeatures(petToEdit.features ?? [])
		speciesDropdown.setById(petToEdit.speciesId)
		breedsDropdown.setById(petToEdit.breedId)
	}, [petToEdit])

	const handleImageUpload = (file: File) => {
		setImageFile(file)
		setInitialPreviewUrl(null)
	}

	const speciesQuery = useGetSpeciesQuery()
	const breedsQuery = useGetBreedsQuery()

	const speciesOptions = speciesQuery.data?.species.map((s) => ({
		id: s.id,
		name: s.name,
	})) ?? []
	const speciesDropdown = useDropdown(
		petToEdit?.speciesId ?? '', speciesOptions
	)
	const selectedSpeciesId = speciesDropdown.selectedOption?.id ?? ''

	const filteredBreeds = breedsQuery.data?.breeds
		.filter((b) => b.speciesId === selectedSpeciesId)
		.map((b) => ({ id: b.id, name: b.name })) ?? []
	const breedsDropdown = useDropdown(petToEdit?.breedId ?? '', filteredBreeds)

	const userInfo = useAppSelector((state) => state.authReducer.userInfo)
	const [createPet, { isLoading: creating }] = useCreatePetMutation()
	const [updatePet, { isLoading: updating }] = useUpdatePetMutation()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()

		if (
			!name.value || !selectedSpeciesId || !breedsDropdown.selectedOption?.id
		) {
			toast.error('Заполните обязательные поля.')
			return
		}

		if (!userInfo?.id) {
			toast.error('Пользователь не авторизован')
			return
		}

		const formData = new FormData()
		formData.append('name', name.value)
		formData.append('speciesId', selectedSpeciesId)
		formData.append('breedId', breedsDropdown.selectedOption.id)
		formData.append('birthdate', birthDate.toDate().toISOString())
		formData.append('gender', gender)
		formData.append('ownerId', userInfo.id)

		if (features.length > 0) {
			features.forEach((feature) => {
				formData.append('features', feature)
			})
		}

		if (imageFile) {
			formData.append('image', imageFile)
		}

		try {
			const action = isEdit
				? updatePet({ id: petToEdit!.id, data: formData }).unwrap()
				: createPet(formData).unwrap()

			const response = await action
			toast.success(response.message)

			name.setValue('')
			speciesDropdown.reset()
			breedsDropdown.reset()
			birthDate.reset()
			setGender(GENDERS.MALE)
			setFeatures([])
			setImageFile(null)

			closeFn()
		} catch (err) {
			toast.error(getErrorMessage(err))
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.field}>
				<ImageDropzone
					initialPreviewUrl={initialPreviewUrl}
					onImageUpload={handleImageUpload}
				/>
			</div>
			<div className={styles.field}>
				<Input
					value={name.value}
					onChange={name.onChange}
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
					label="Породы"
					options={filteredBreeds}
					onChange={breedsDropdown.onChange}
					selectedOption={breedsDropdown.selectedOption}
					placeholder="Выберите породу"
				/>
			</div>
			<div className={styles.field}>
				<DateDropdown
					label="Дата рождения"
					onChange={birthDate.set}
					initialDate={birthDate.toDate()}
				/>
			</div>
			<div className={styles.field}>
				<span className={styles.label}>Пол</span>
				<div className={styles.radio}>
					<Radio
						name="gender"
						label="Мужской"
						value={GENDERS.MALE}
						checked={gender === GENDERS.MALE}
						onChange={setGender}
					/>
					<Radio
						name="gender"
						label="Женский"
						value={GENDERS.FEMALE}
						checked={gender === GENDERS.FEMALE}
						onChange={setGender}
					/>
				</div>
			</div>
			<div className={styles.field}>
				<FeaturesInput
					features={features}
					setFeatures={setFeatures}
					label="Особенности / Аллергия"
				/>
			</div>
			<Button
				className={styles.button}
				text={creating || updating
					? 'Сохраняем...'
					: isEdit
						? 'Сохранить изменения'
						: 'Сохранить'
				}
				type="submit"
				disabled={creating || updating}
			/>
		</form>
	)
}