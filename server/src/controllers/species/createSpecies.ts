import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Species } from 'models/species';

export const createSpecies = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Название обязательно');
  }

  const existing = await Species.findOne({ name });
  if (existing) {
    res.status(409);
    throw new Error('Такой вид питомца уже существует.');
  }

  const newSpecies = await Species.create({ name });

  res.status(201).json({
    message: 'Вид питомца успешно создан.',
    species: newSpecies,
  });
});