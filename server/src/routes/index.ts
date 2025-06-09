import express from 'express'
import { appointmentsRouter, authRouter, breedsRouter, petsRouter, servicesRouter, speciesRouter, userRouter } from './routes'

const app = express()

app.use('/api/appointments', appointmentsRouter)
app.use('/api/auth', authRouter)
app.use('/api/breeds', breedsRouter)
app.use('/api/pets', petsRouter)
app.use('/api/services', servicesRouter)
app.use('/api/species', speciesRouter)
app.use('/api/users', userRouter)

export default app
