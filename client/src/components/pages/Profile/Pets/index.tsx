import { useState, type FC } from 'react'
import { toast } from 'react-toastify'
import { PetModal, PetInfoModal } from '@components/modals'
import { PetCard } from '@components/ui'
import { useBoolean } from '@hooks'
import type { PetModel } from '@models'
import {
	useDeletePetMutation,
	useGetBreedsQuery,
	useGetPetsQuery,
	useGetSpeciesQuery,
} from '@store/api'
import { getErrorMessage } from '@utils/helpers'
import styles from './styles.module.css'

const ProfilePets: FC = () => {
	const [selectedPet, setSelectedPet] = useState<PetModel | null>(null)
	const addPetModal = useBoolean(false)
	const editPetModal = useBoolean(false)
	const petInfoModal = useBoolean(false)

	const [deletePet] = useDeletePetMutation()
	const { data } = useGetPetsQuery()
	const speciesQuery = useGetSpeciesQuery()
	const breedsQuery = useGetBreedsQuery()

	const getSpeciesName = (id: string): string => {
		return speciesQuery.data?.species.find((s) => s.id === id)?.name ?? id
	}

	const getBreedName = (id: string): string => {
		return breedsQuery.data?.breeds.find((b) => b.id === id)?.name ?? id
	}

	const openPetInfoModal = (pet: PetModel): void => {
		setSelectedPet(pet)
		petInfoModal.setTrue()
	}

	const handleEditPet = (): void => {
		console.log(selectedPet)
		petInfoModal.setFalse()
		editPetModal.setTrue()
	}

	const handleDeletePet = async (): Promise<void> => {
		if (!selectedPet) return

		const confirmed = window.confirm(`Удалить питомца "${selectedPet.name}"?`)
		if (!confirmed) return

		try {
			const response = await deletePet({ id: selectedPet.id }).unwrap()
			toast.success(response.message)
			petInfoModal.setFalse()
			setSelectedPet(null)
		} catch (err) {
			toast.error(getErrorMessage(err))
		}
	}

	return (
		<div className={styles.pets}>
			<ul className={styles.list}>
				{data?.pets.map((pet) => (
					<li
						key={pet.id}
						className={styles.item}
						onClick={() => openPetInfoModal(pet)}
					>
						<PetCard title={pet.name} imageUrl={pet.imageUrl} />

					</li>
				))}
				<div className={styles.addButton} onClick={addPetModal.setTrue} />
			</ul>
			<PetModal
				isOpen={addPetModal.value}
				closeFn={addPetModal.setFalse}
			/>
			<PetModal
				isOpen={editPetModal.value}
				closeFn={() => {
					editPetModal.setFalse()
					setSelectedPet(null)
				}}
				petToEdit={selectedPet!}
			/>
			{selectedPet && (
				<PetInfoModal
					isOpen={petInfoModal.value}
					closeFn={petInfoModal.setFalse}
					linkText="← Назад к записам"
					name={selectedPet.name}
					species={getSpeciesName(selectedPet.speciesId)}
					breed={getBreedName(selectedPet.breedId)}
					birthDate={selectedPet.birthDate}
					imageUrl={selectedPet.imageUrl}
					features={selectedPet.features}
					editFn={handleEditPet}
					deleteFn={handleDeletePet}
				>
					rest info
				</PetInfoModal>
			)}
		</div>
	)
}

export default ProfilePets