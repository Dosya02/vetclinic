import { FC } from 'react';
import { ServicesIntroImg } from '@images';
import { BgContainer, Container } from '@components';

export const Intro: FC = () => (
  <BgContainer className="c-services__intro" image={ServicesIntroImg}>
    <Container>
      <div className="c-services__intro-inner u-text-center">
        <h1 className="c-services__intro-title">Услуги</h1>
        <p className="c-services__intro-text">
          Мы свяжем вас с нашей компетентной командой специалистов в области
          здравоохранения
        </p>
      </div>
    </Container>
  </BgContainer>
);