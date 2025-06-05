import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Species } from 'models/species';

export const getAllSpecies = asyncHandler(async (
  _req: Request,
  res: Response,
) => {
  const species = await Species.find().sort({ name: 1 });

  res.json({
    message: 'Список видов питомцев успешно получен.',
    species,
  });
});