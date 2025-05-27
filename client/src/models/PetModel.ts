import { CAT_BREEDS, DOG_BREEDS, PET_TYPES } from '@constants';

export type PetType = typeof PET_TYPES[keyof typeof PET_TYPES];
export type DogBreeds = typeof DOG_BREEDS[keyof typeof DOG_BREEDS];
export type CatBreeds = typeof CAT_BREEDS[keyof typeof CAT_BREEDS];

interface BaseModel {
  id?: string;
  name: string;
  avatarUrl?: string;
  type: PetType;
  breed: 'none' | DogBreeds | CatBreeds;
}

export interface DogModel extends BaseModel {
  type: typeof PetTypes.DOG;
  breed: DogBreed;
}

export interface CatModel extends BaseModel {
  type: typeof PetTypes.CAT;
  breed: CatBreed;
}

export type PetModel = DogModel | CatModel;