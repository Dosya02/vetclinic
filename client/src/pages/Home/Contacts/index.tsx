import { Container, Icon, Image, Section } from '@components';
import { ICONS } from '@constants';
import { GoogleMapImg } from '@images';

interface Props {
  id?: string;
}

export const Contacts: React.FC<Props> = ({ id }) => (
  <Section className="c-contacts" alternate id={id}>
    <Container>
      <div className="c-contacts__inner">
        <div className="c-contacts__items">
          <h2 className="c-contacts__title u-text-left">
            Контакты
          </h2>
          <div className="c-contacts__item">
            <Icon className="c-contacts__item-icon" name={ICONS.LOCATION}/>
            <p className="c-contacts__item-text">
              Наш адрес:<br/>
              <span>г. Алматы ул.</span><br/>
              <span>Байтурсынова 125</span>
            </p>
          </div>
          <div className="c-contacts__item">
            <Icon className="c-contacts__item-icon" name={ICONS.PHONE}/>
            <p className="c-contacts__item-text">
              Ресепшн:<br/>
              <span>+7 705 806 24 83</span><br/>
              <span>+7 705 678 50 44</span>
            </p>
          </div>
        </div>
        <div className="c-contacts__image">
          <Image src={GoogleMapImg} alt="google map img"/>
        </div>
      </div>
    </Container>
  </Section>
);