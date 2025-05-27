import { Container, Section } from '@components';
import { servicesData } from '@data';
import { Banner } from './Banner';
import { ServiceCard } from './Card';

export const List = () => (
  <Section>
    <Container>
      <div className="c-services__content">
        <ul className="c-services__content-list">
          {servicesData.map((service, index) => (
            <li className="c-services__content-item" key={index}>
              <ServiceCard service={service}/>
            </li>
          ))}
        </ul>
        <Banner/>
      </div>
    </Container>
  </Section>
);