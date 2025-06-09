import { Router } from 'express'
import { API_PATHS } from 'constants/paths'
import {
  createSpecies,
  deleteSpecies,
  getAllSpecies,
  updateSpecies,
} from 'controllers/species'

const speciesRouter = Router()

speciesRouter.get(API_PATHS.SPECIES_ROUTES.GET_ALL, getAllSpecies)
speciesRouter.post(API_PATHS.SPECIES_ROUTES.CREATE, createSpecies)
speciesRouter.put(API_PATHS.SPECIES_ROUTES.UPDATE, updateSpecies)
speciesRouter.delete(API_PATHS.SPECIES_ROUTES.DELETE, deleteSpecies)

export { speciesRouter }