import { useEffect } from 'react';
import { useActions } from '@hooks';
import { useGetSpeciesQuery } from '@store/api';
import { useAppSelector } from '@store/hooks';

export const useLoadSpecies = () => {
  const { loadedOnce } = useAppSelector((state) => state.speciesReducer);
  const { setSpecies, setSpeciesLoading, setSpeciesLoadedOnce } = useActions();

  const { data, isFetching, isSuccess } = useGetSpeciesQuery(undefined, {
    skip: loadedOnce,
  });

  useEffect(() => {
    setSpeciesLoading(isFetching);
    if (isSuccess && data) {
      setSpecies(data.species);
      setSpeciesLoadedOnce(true);
    }
  }, [isFetching, isSuccess, data]);

  return { isFetching };
};
