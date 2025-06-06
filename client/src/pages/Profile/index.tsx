import { FC } from 'react';
import { Container, Section } from '@components';
import { Outlet } from 'react-router-dom';
import { ProfileSidebar } from '@pages/Profile/Sidebar';

const ProfilePage: FC = () => {
  return (
    <Section>
      <Container>
        <div className="c-profile">
          <ProfileSidebar/>
          <Outlet/>
        </div>
      </Container>
    </Section>
  );
};

export default ProfilePage;