import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Breed } from 'models/breed';

export const deleteBreed = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  const breed = await Breed.findById(id);
  if (!breed) {
    res.status(404);
    throw new Error('Порода не найдена.');
  }

  await breed.deleteOne();

  res.json({
    message: 'Порода успешно удалена.',
  });
});