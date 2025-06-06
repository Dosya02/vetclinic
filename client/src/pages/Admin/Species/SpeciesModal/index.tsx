import { FC, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { Button, Input, Modal } from '@components';
import { useBoolean } from '@hooks';
import { getErrorMessage } from '@helpers';

interface Props {
  isActive: boolean;
  text: string;
  closeFn: () => void;
  onSubmit: () => Promise<{ message: string }>;
  name: string;
  setName: (value: string) => void;
}

export const SpeciesModal: FC<Props> = ({
  isActive,
  text,
  closeFn,
  onSubmit,
  name,
  setName,
}) => {
  const isSubmitting = useBoolean(false);

  const handleCancel = () => {
    toast.info('Операция отменена');
    closeFn();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Введите название');
      return;
    }

    try {
      isSubmitting.setTrue();
      const response = await onSubmit();
      toast.success(response.message);
      setName('');
      closeFn();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      isSubmitting.setFalse();
    }
  };

  return (
    <Modal active={isActive}>
      <div className="c-modal__content">
        <p className="c-modal__text">{text}</p>
        <div className="c-modal__inner">
          <form className="c-modal__form" onSubmit={handleSubmit}>
            <div className="c-modal__form-input">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                errorMessage=""
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
                disabled={isSubmitting.value}
                type="button"
              />
              <Button
                className="c-modal__button"
                type="submit"
                text={isSubmitting.value ? 'Сохранение...' : 'Сохранить'}
                rounded
                disabled={isSubmitting.value}
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
