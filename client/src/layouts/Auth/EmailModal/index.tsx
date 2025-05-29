import { FC } from 'react';
import { Modal } from '@components';
import { Form } from './Form';

interface Props {
  isActive: boolean;
}

export const EmailModal: FC<Props> = ({ isActive }) => (
  <Modal active={isActive}>
    <div className="c-modal-email__content">
      <p className="c-modal-email__text u-text-center">
        Для восстановления пароля введи вашу почту.
      </p>
      <Form/>
    </div>
  </Modal>
);