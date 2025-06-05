import { FC, FormEvent, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Dropdown, Input, Modal } from '@components';
import { useActions, useBreedName } from '@hooks';
import { useAppSelector } from '@store/hooks';
import { getErrorMessage } from '@helpers';

interface Props {
  isActive: boolean;
  text: string;
  closeFn: () => void;
  onSubmit: (values: {
    name: string;
    speciesId: string;
    id?: string
  }) => Promise<void>;
}

export const BreedsModal: FC<Props> = ({
  isActive,
  text,
  closeFn,
  onSubmit,
}) => {
  const {
    changeBreedSpeciesId,
    clearCurrentBreedId,
    resetBreedsFields,
  } = useActions();

  const {
    name,
    nameErrorMessage,
    onNameChange,
    isValidName,
  } = useBreedName();

  const { currentId, speciesId } = useAppSelector(state => state.breedsReducer);
  const species = useAppSelector(state => state.speciesReducer.species);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCancel = () => {
    toast.info('Операция отменена');
    resetBreedsFields();
    clearCurrentBreedId();
    setIsSubmitted(false);
    closeFn();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isValidName() || !speciesId) {
      toast.error('Введите название и выберите вид');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({ name, speciesId, id: currentId });
      resetBreedsFields();
      clearCurrentBreedId();
      setIsSubmitted(false);
      closeFn();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const options = useMemo(() => {
    return species.map(s => (
      {
        value: s.id,
        label: s.name,
      }
    ));
  }, [species]);

  const selectedOption = useMemo(() => {
    return options.find(opt => opt.value === speciesId) || null;
  }, [options, speciesId]);

  const handleSelectSpecies = (value: string): void => {
    changeBreedSpeciesId(value);
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
                errorMessage={isSubmitted && !isValidName()
                              ? nameErrorMessage
                              : ''}
                placeholder="Введите тип питомца"
              />
              <Dropdown
                options={options}
                selected={selectedOption ?? undefined}
                onSelect={handleSelectSpecies}
                placeholder="Выберите вид"
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