import { FC } from 'react';
import { Icon } from '@components';
import { aboutFeatures } from '@data';

export const Features: FC = () => (
  <div className="c-about__features">
    {aboutFeatures.map((feature, index) => (
      <div className="c-about__feature" key={index}>
        <Icon name={feature.icon} className="c-about__feature-icon"/>
        <p className="c-about__feature-text">{feature.text}</p>
      </div>
    ))}
  </div>
);