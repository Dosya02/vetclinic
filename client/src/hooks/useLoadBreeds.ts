import { useEffect } from 'react';
import { useActions } from '@hooks';
import { useAppSelector } from '@store/hooks';
import { useGetBreedsQuery } from '@store/api';

export const useLoadBreeds = () => {
  const { loadedOnce } = useAppSelector((state) => state.breedsReducer);
  const { setBreeds, setBreedsLoading, setBreedsLoadedOnce } = useActions();

  const { data, isFetching, isSuccess } = useGetBreedsQuery(undefined, {
    skip: loadedOnce,
  });

  useEffect(() => {
    setBreedsLoading(isFetching);
    if (isSuccess && data) {
      setBreeds(data.breeds);
      setBreedsLoadedOnce(true);
    }
  }, [isFetching, isSuccess, data]);

  return { isFetching };
};
