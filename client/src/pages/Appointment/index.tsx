import { FC } from 'react';
import { BgContainer } from '@components';
import { AppointmentBgImg } from '@images';
import { GuestForm } from './GuestForm';

export const AppointmentPage: FC = () => (
  <BgContainer className="c-appointment" image={AppointmentBgImg}>
    <div className="c-appointment__inner">
      <h2 className="c-appointment__title u-text-center">
        Записаться на прием
      </h2>
      <GuestForm />
    </div>
  </BgContainer>
);