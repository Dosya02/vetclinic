import { Image } from '@components';
import { ServiceModel } from '@models';

interface Props {
  service: ServiceModel;
}

export const ServiceCard: React.FC<Props> = ({ service }) => (
  <div className="c-service-card">
    <div className="c-service-card__image">
      {service.image && <Image src={service.image} alt={service.name}/>}
    </div>
    <div className="c-service-card__title-wrapper">
      <div className="c-service-card__icon">
        <Image src={service.icon} alt={service.name}/>
      </div>
      <h4 className="c-service-card__title">{service.name}</h4>
    </div>
    <p className="c-service-card__text">{service.description}</p>
  </div>
);