import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-[#141414] transition-colors duration-300">
      <Header />

      <div className="flex-1 p-0">
        <Outlet />
      </div>

      {!isAdmin && <Footer />}

    </div>
  );
};

export default MainLayout;