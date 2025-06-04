import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './Sidebar';

const AdminPage: FC = () => {
  return (
    <div className="o-admin__wrapper">
      <AdminSidebar/>
      <main className="o-admin__main">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPage;