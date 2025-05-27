import { FC } from 'react';
import { Icon } from '@components';

interface Props {
  name: string;
  icon: string;
  description: string;
}

export const Card: FC<Props> = ({ name, icon, description }) => (
  <div className="c-home-service-card u-text-center">
    <Icon className="c-home-service-card__icon" name={icon}/>
    <h4 className="c-home-service-card__title">{name}</h4>
    <p className="c-home-service-card__text">{description}</p>
  </div>
);