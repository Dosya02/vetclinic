import { FC } from 'react';
import { Container, Logo } from '@components';
import { HeaderNav } from './Nav';
import { HeaderActions } from './Actions';

export const Header: FC = () => (
  <header className="c-header">
    <Container>
      <div className="c-header__inner">
        <Logo />
        <HeaderNav />
        <HeaderActions />
      </div>
    </Container>
  </header>
);