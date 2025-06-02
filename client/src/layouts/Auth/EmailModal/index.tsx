import { FC } from 'react';
import { Modal } from '@components';
import { EmailModalForm } from './Form';

interface Props {
  isActive: boolean;
}

export const EmailModal: FC<Props> = ({ isActive }) => (
  <Modal active={isActive}>
    <div className="c-modal-email__content">
      <p className="c-modal-email__text">
        Для восстановления пароля введи вашу почту.
      </p>
      <EmailModalForm/>
    </div>
  </Modal>
);