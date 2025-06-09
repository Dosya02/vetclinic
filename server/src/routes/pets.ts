import { Router } from 'express'
import { API_PATHS } from 'constants/paths'
import {
	createPet,
	deletePet,
	getAllPets,
	updatePet,
} from 'controllers/pet'

const petsRouter = Router()

petsRouter.get(API_PATHS.PETS_ROUTES.GET_ALL, getAllPets)
petsRouter.post(API_PATHS.PETS_ROUTES.CREATE, createPet)
petsRouter.put(API_PATHS.PETS_ROUTES.UPDATE, updatePet)
petsRouter.delete(API_PATHS.PETS_ROUTES.DELETE, deletePet)

export { petsRouter }