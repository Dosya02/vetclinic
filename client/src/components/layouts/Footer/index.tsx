import { FC } from 'react';
import { Container, Logo } from '@components';

export const Footer: FC = () => (
  <footer className="c-footer">
    <Container>
      <div className="c-footer__inner">
        <Logo variant="dark"/>
        <p className="c-footer__copyright">
          © Все права защищены
        </p>
      </div>
    </Container>
  </footer>
);