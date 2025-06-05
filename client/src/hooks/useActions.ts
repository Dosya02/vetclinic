import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useAppDispatch } from '@store/hooks';
import { rootActions } from '@store/reducers';

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};