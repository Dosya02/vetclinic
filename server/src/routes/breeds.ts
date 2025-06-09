import { Router } from 'express'
import { API_PATHS } from 'constants/paths'
import {
  createBreed,
  deleteBreed,
  getAllBreeds,
  updateBreed,
} from 'controllers/breeds'

const breedsRouter = Router()

breedsRouter.get(API_PATHS.BREEDS_ROUTES.GET_ALL, getAllBreeds)
breedsRouter.post(API_PATHS.BREEDS_ROUTES.CREATE, createBreed)
breedsRouter.put(API_PATHS.BREEDS_ROUTES.UPDATE, updateBreed)
breedsRouter.delete(API_PATHS.BREEDS_ROUTES.DELETE, deleteBreed)

export { breedsRouter }