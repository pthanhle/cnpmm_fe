import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <div className="p-4 flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;