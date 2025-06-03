import { FC } from 'react';
import { Modal } from '@components';
import { PasswordModalForm } from './Form';

interface Props {
  isActive: boolean;
  text: string;
  isLoading: boolean;
  onSubmitFn: (data: { email: string; password: string; }) => Promise<{
    message: string;
    token: string;
  }>;
}

export const PasswordModal: FC<Props> = ({
  isActive,
  text,
  isLoading,
  onSubmitFn,
}) => (
  <Modal active={isActive}>
    <div className="c-modal__content">
      <p className="c-modal__text">{text}</p>
      <PasswordModalForm
        isLoading={isLoading}
        onSubmitFn={onSubmitFn}
      />
    </div>
  </Modal>
);