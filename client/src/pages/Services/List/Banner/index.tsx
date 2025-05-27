import { FC } from 'react';
import { ServicesBannerImg } from '@images';
import { Button, Image } from '@components';

export const Banner: FC = () => (
  <div className="c-services__banner">
    <div className="c-services__banner-content">
      <h4 className="c-services__banner-title">
        Запишитесь на приём сегодня
      </h4>
      <Button text="Записаться"/>
    </div>
    <div className="c-services__banner-image">
      <Image
        src={ServicesBannerImg}
        alt="services banner"
      />
    </div>
  </div>
);