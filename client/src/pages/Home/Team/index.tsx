import { FC } from 'react';
import { Container, Section } from '@components';
import { team } from '@data';
import { Card } from './Card';

interface Props {
  id?: string;
}

export const TeamSection: FC<Props> = ({ id }) => (
  <Section className="c-team" id={id} alternate>
    <Container>
      <div className="c-team__inner">
        <h2 className="c-team__title u-text-center">
          Познакомьтесь с нашей командой
        </h2>
        <div className="c-team__items">
          {team.map((doctor, index) => (
            <Card key={index} doctor={doctor}/>
          ))}
        </div>
      </div>
    </Container>
  </Section>
);