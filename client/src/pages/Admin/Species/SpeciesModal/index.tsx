import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Button, Input, Modal } from '@components';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@helpers';

interface Props {
  isActive: boolean;
  closeFn: () => void;
  onSubmit: (values: { name: string; id?: string }) => Promise<void>;
  initialData?: { name: string; id?: string };
}

export const SpeciesModal: FC<Props> = ({
  isActive,
  closeFn,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setName(initialData?.name ?? '');
    setErrorMessage('');
  }, [initialData, isActive]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
    setErrorMessage('');
  };

  const handleCancel = () => {
    toast.info('Операция отменена');
    closeFn();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Введите название');
      return;
    }

    try {
      await onSubmit({ name, id: initialData?.id });
      closeFn();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Modal active={isActive}>
      <div className="c-modal__content">
        <p className="c-modal__text">
          {initialData?.id ? 'Редактировать вид' : 'Добавить вид'}
        </p>
        <div className="c-modal__inner">
          <form className="c-modal__form" onSubmit={handleSubmit}>
            <div className="c-modal__form-input">
              <Input
                value={name}
                onChange={handleNameChange}
                errorMessage={errorMessage}
                placeholder="Введите тип питомца"
              />
            </div>
            <div className="c-modal__buttons">
              <Button
                className="c-modal__button"
                text="Отмена"
                rounded
                reverse
                onClick={handleCancel}
              />
              <Button
                className="c-modal__button"
                type="submit"
                text="Сохранить"
                rounded
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};