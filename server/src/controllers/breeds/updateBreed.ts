import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Breed } from 'models/breed';
import { handleDuplicateKeyError } from 'utils/handleDuplicateKeyError';

export const updateBreed = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const { name, speciesId } = req.body;

  const breed = await Breed.findById(id);
  if (!breed) {
    res.status(404);
    throw new Error('Порода не найдена.');
  }

  if (name !== undefined) {
    breed.name = name;
  }
  if (speciesId !== undefined) {
    breed.speciesId = speciesId;
  }

  try {
    await breed.save();
    res.json({
      message: 'Порода успешно обновлена.',
      breed,
    });
  } catch (error: any) {
    handleDuplicateKeyError(
      res,
      error,
      'Такая порода уже существует для указанного вида.',
    );
  }
});