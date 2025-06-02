import { FC } from 'react';
import { Modal } from '@components';
import { PasswordModalForm } from './Form';

interface Props {
  isActive: boolean;
}

export const PasswordModal: FC<Props> = ({ isActive }) => (
  <Modal active={isActive}>
    <div className="c-modal-password__content">
      <p className="c-modal-password__text">
        Для восстановления пароля введи вашу почту.
      </p>
      <PasswordModalForm/>
    </div>
  </Modal>
);