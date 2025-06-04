import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './Sidebar';

const AdminPage: FC = () => {
  return (
    <div className="c-admin">
      <AdminSidebar/>
      <main className="c-admin__main">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPage;