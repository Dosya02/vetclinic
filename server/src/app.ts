import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import { env } from './config/env'
import { API_PATHS } from 'constants/paths'
import { errorHandler } from 'middlewares/error'
import {
  appointmentsRouter,
  authRouter,
  breedsRouter,
  petsRouter,
  servicesRouter,
  speciesRouter,
  userRouter,
} from 'routes'

const app = express()

app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}))

app.use(express.json())

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads/tmp',
}))

app.use(API_PATHS.AUTH, authRouter)
app.use(API_PATHS.USER, userRouter)
app.use(API_PATHS.SPECIES, speciesRouter)
app.use(API_PATHS.BREEDS, breedsRouter)
app.use(API_PATHS.PETS, petsRouter)
app.use(API_PATHS.SERVICES, servicesRouter)
app.use(API_PATHS.APPOINTMENTS, appointmentsRouter)

app.use(errorHandler)

export { app }
