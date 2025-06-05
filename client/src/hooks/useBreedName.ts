import { ChangeEvent } from 'react';
import { useActions } from '@hooks';
import { useAppSelector } from '@store/hooks';

export const useBreedName = () => {
  const { changeBreedName } = useActions();

  const {
    name,
    nameErrorMessage,
  } = useAppSelector(state => state.breedsReducer);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    changeBreedName(e.target.value);
  };

  const isValidName = (): boolean => {
    return !!name.trim();
  };

  return { name, nameErrorMessage, onNameChange, isValidName };
};