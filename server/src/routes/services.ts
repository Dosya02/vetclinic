import { Router } from 'express'
import { API_PATHS } from 'constants/paths'
import {
	createService,
	deleteService,
	getAllServices,
	updateService,
} from 'controllers/services'

const servicesRouter = Router()

servicesRouter.get(API_PATHS.SERVICES_ROUTES.GET_ALL, getAllServices)
servicesRouter.post(API_PATHS.SERVICES_ROUTES.CREATE, createService)
servicesRouter.put(API_PATHS.SERVICES_ROUTES.UPDATE, updateService)
servicesRouter.delete(API_PATHS.SERVICES_ROUTES.DELETE, deleteService)

export { servicesRouter }