import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Section } from '@components';
import { homeServices } from '@data';
import { APP_ROUTES } from '@routes';
import { Card } from './Card';

interface Props {
  id?: string;
}

export const Services: FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(APP_ROUTES.SERVICES);
  };
  
  return (
    <Section className="c-home-services" id={id}>
      <Container>
        <div className="c-home-services__inner">
          <h2 className="c-home-services__title u-text-center">
            Услуги по уходу за домашними животными
          </h2>
          <ul className="c-home-services__items">
            {homeServices.map((service, index) =>
                                <li key={index}
                                    className="c-home-services__item">
                                  <Card
                                    name={service.name}
                                    icon={service.icon}
                                    description={service.description}
                                  />
                                </li>,
            )}
          </ul>
          <Button
            className="c-home-services__button"
            text="Другие услуги"
            onClick={handleClick}
          />
        </div>
      </Container>
    </Section>
  );
};