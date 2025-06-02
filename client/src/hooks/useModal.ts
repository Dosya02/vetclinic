import { useState } from 'react';

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setOpen] = useState<boolean>(initialState);

  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => setOpen(prev => !prev);

  return { isOpen, open, close, toggle };
};