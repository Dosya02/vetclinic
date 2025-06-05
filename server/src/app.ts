import express from 'express';
import cors from 'cors';
import { env } from 'config/env';
import { API_PATHS } from 'constants/paths';
import { errorHandler } from 'middlewares/error';
import { authRouter, breedsRouter, speciesRouter } from 'routes';

const app = express();

app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());

app.use(API_PATHS.AUTH, authRouter);
app.use(API_PATHS.SPECIES, speciesRouter);
app.use(API_PATHS.BREEDS, breedsRouter);

app.use(errorHandler);

export { app };