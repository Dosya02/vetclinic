import { FC, FormEvent, useState } from 'react';
import { Button, Input, Modal } from '@components';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { clearCurrentSpeciesId, resetFields } from '@store/reducers/species';
import { useSpeciesName } from '@hooks';
import { getErrorMessage } from '@helpers';

interface Props {
  isActive: boolean;
  text: string;
  closeFn: () => void;
  onSubmit: (values: { name: string; id?: string }) => Promise<void>;
}

export const SpeciesModal: FC<Props> = ({
  isActive,
  text,
  closeFn,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();
  const {
    name,
    nameErrorMessage,
    onNameChange,
    isValidName,
  } = useSpeciesName();
  const currentId = useAppSelector(state => state.speciesReducer.currentId);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    toast.info('Операция отменена');
    dispatch(resetFields());
    dispatch(clearCurrentSpeciesId());
    closeFn();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidName()) {
      toast.error('Введите название');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({ name, id: currentId });
      dispatch(resetFields());
      dispatch(clearCurrentSpeciesId());
      closeFn();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
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
                onChange={onNameChange}
                errorMessage={nameErrorMessage}
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
                disabled={isSubmitting}
              />
              <Button
                className="c-modal__button"
                type="submit"
                text={isSubmitting ? 'Сохранение...' : 'Сохранить'}
                rounded
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};