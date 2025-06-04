import { FC } from 'react';
import { ANCHORS } from '@constants';
import { HeroSection } from './Hero';
import { AboutSection } from './About';
import { TeamSection } from './Team';
import { Services } from './Services';
import { Contacts } from './Contacts';

const HomePage: FC = () => (
  <>
    <HeroSection id={ANCHORS.INTRO.id}/>
    <AboutSection id={ANCHORS.ABOUT_US.id}/>
    <TeamSection id={ANCHORS.TEAM.id}/>
    <Services id={ANCHORS.SERVICES.id}/>
    <Contacts id={ANCHORS.CONTACTS.id}/>
  </>
);

export default HomePage;