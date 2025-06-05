import { ChangeEvent } from 'react';
import { useActions } from '@hooks';
import { useAppSelector } from '@store/hooks';

export const useSpeciesName = () => {
  const { changeSpeciesName } = useActions();

  const {
    name,
    nameErrorMessage,
  } = useAppSelector(state => state.speciesReducer);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    changeSpeciesName(e.target.value);
  };

  const isValidName = (): boolean => {
    return !!name.trim();
  };

  return { name, nameErrorMessage, onNameChange, isValidName };
};