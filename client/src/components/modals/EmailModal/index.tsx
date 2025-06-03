import { FC } from 'react';
import { Modal } from '@components';
import { EmailModalForm } from './Form';

interface Props {
  isActive: boolean;
  text: string;
  isLoading: boolean;
  onSubmitFn: (data: { email: string }) => Promise<{ message: string }>;
}

export const EmailModal: FC<Props> = ({
  isActive,
  text,
  isLoading,
  onSubmitFn,
}) => (
  <Modal active={isActive}>
    <div className="c-modal__content">
      <p className="c-modal__text">{text}</p>
      <EmailModalForm
        isLoading={isLoading}
        onSubmitFn={onSubmitFn}
      />
    </div>
  </Modal>
);