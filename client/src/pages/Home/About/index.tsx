import { FC } from 'react';
import { Container, Image, Section } from '@components';
import { HomeAboutImg } from '@images';
import { Info } from './Info';
import { Features } from './Features';

interface Props {
  id?: string;
}

export const AboutSection: FC<Props> = ({ id }) => (
  <Section className="c-about" id={id}>
    <Container>
      <div className="c-about__inner">
        <h2 className="c-about__title u-text-left">
          Мы предоставляем лучшие услуги по уходу за домашними животными
        </h2>
        <Info/>
        <Features/>
      </div>
    </Container>
    
    <div className="c-about__image">
      <Image src={HomeAboutImg} alt="about image"/>
    </div>
  </Section>
);