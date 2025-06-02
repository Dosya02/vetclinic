import { FC } from 'react';
import { Button, Image } from '@components';
import { DoctorModel } from '@models';

interface Props {
  doctor: DoctorModel;
}

export const Card: FC<Props> = ({ doctor }) => (
  <div className="c-team-card">
    <div className="c-team-card__image">
      <Image src={doctor.avatarUrl!} alt={doctor.firstName!}/>
    </div>
    <div className="c-team-card__content u-text-center">
      <h3 className="c-team-card__title">
        {doctor.firstName + ' ' + doctor.lastName}
      </h3>
      <p className="c-team-card__text">{doctor.position}</p>
    </div>
    <div/>
    <Button text="Записаться" rounded/>
  </div>
);