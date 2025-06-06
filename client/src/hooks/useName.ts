import { ChangeEvent, useState } from 'react';

export const useName = () => {
  const [name, setName] = useState<string>('');

  const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  return { name, onNameChange };
};