import { FC } from 'react';
import { Container, Modal } from '@components';
import { AddPetModalForm } from './Form';

interface AddPetModalProps {
  isOpen: boolean;
  closeFn: () => void;
}

export const AddPetModal: FC<AddPetModalProps> = ({ isOpen, closeFn }) => (
  <Modal active={isOpen} variant="light">
    <div className="c-add-pet-modal">
      <Container>
        <div className="c-add-pet-modal__inner">
          <span className="c-add-pet-modal__close-text" onClick={closeFn}>
            ← Назад к питомцам
          </span>
          <h5 className="c-add-pet-modal__title">
            Создание карточки питомца
          </h5>
          <AddPetModalForm/>
        </div>
      </Container>
    </div>
  </Modal>
);