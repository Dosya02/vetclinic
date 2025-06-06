import { FC, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { Button, Dropdown, Input, Modal } from '@components';
import { DropdownOption } from '@constants';
import { useBoolean } from '@hooks';

interface Props {
  isActive: boolean;
  text: string;
  closeFn: () => void;
  onSubmit: () => Promise<{ message: string }>;
  name: string;
  setName: (value: string) => void;
  speciesOptions: DropdownOption[];
  selectedSpeciesId: string;
  setSelectedSpeciesId: (value: string) => void;
}

export const BreedsModal: FC<Props> = ({
  isActive,
  text,
  closeFn,
  onSubmit,
  name,
  setName,
  speciesOptions,
  selectedSpeciesId,
  setSelectedSpeciesId,
}) => {
  const isSubmitting = useBoolean(false);

  const handleCancel = () => {
    toast.info('Операция отменена');
    closeFn();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Введите название породы');
      return;
    }
    if (!selectedSpeciesId) {
      toast.error('Выберите вид питомца');
      return;
    }

    try {
      isSubmitting.setTrue();
      const response = await onSubmit();
      toast.success(response.message);
      setName('');
      setSelectedSpeciesId('');
      closeFn();
    } catch {
      toast.error('Ошибка при сохранении');
    } finally {
      isSubmitting.setFalse();
    }
  };

  const selectedOption = speciesOptions.find(
    opt => opt.value === selectedSpeciesId,
  );

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
                placeholder="Введите название породы"
              />
            </div>

            <div className="c-modal__form-input" style={{ marginTop: '1rem' }}>
              <Dropdown
                options={speciesOptions}
                selected={selectedOption}
                onSelect={setSelectedSpeciesId}
                placeholder="Выберите вид питомца"
                rounded
              />
            </div>

            <div className="c-modal__buttons" style={{ marginTop: '1rem' }}>
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
