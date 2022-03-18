import { ReactNode } from 'react';
import { Sidebar } from '../Navigation/Sidebar';
import { Navbar } from '../Navigation/Navbar';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main style={{ display: 'grid', gridTemplateRows: '70px auto' }}>
      <Navbar />
      <div style={{ display: 'grid', gridTemplateColumns: '300px auto' }}>
        <Sidebar />
        {children}
      </div>
    </main>
  );
};
