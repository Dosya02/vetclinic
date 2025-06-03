import { FC, ReactNode } from 'react';
import { Icon, Modal } from '@components';
import { ICONS } from '@constants';
import { CodeModalForm } from './Form';

interface Props {
  isActive: boolean;
  children: ReactNode;
  isLoading: boolean;
  onSubmitFn: (data: { email: string; code: string }) => Promise<{
    message: string
  }>;
}

export const CodeModal: FC<Props> = ({
  isActive,
  children,
  isLoading,
  onSubmitFn,
}) => (
  <Modal active={isActive}>
    <div className="c-modal__content c-modal__content--code">
      <Icon className="c-modal__icon" name={ICONS.MAIL_CHECKED}/>
      <div className="c-modal__inner">
        <p className="c-modal__text">
          {children}
        </p>
        <CodeModalForm
          isLoading={isLoading}
          onSubmitFn={onSubmitFn}
        />
      </div>
    </div>
  </Modal>
);