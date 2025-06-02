import { FC } from 'react';
import { BgContainer, Button, Container } from '@components';
import { HomeIntroImg } from '@images';

interface Props {
  id?: string;
}

export const HeroSection: FC<Props> = ({ id }) => (
  <BgContainer className="c-hero" image={HomeIntroImg} id={id}>
    <Container>
      <div className="c-hero__inner">
        <h1 className="c-hero__title">
          Вашему любимцу всегда окажут помощь
        </h1>
        <Button text="Записаться" rounded/>
      </div>
    </Container>
  </BgContainer>
);