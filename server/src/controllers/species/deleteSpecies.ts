import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Species } from 'models/species';

export const deleteSpecies = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  const species = await Species.findById(id);
  if (!species) {
    res.status(404);
    throw new Error('Вид питомца не найден.');
  }

  await species.deleteOne();

  res.json({
    message: 'Вид питомца успешно удалён.',
  });
});