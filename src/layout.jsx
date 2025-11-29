import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

const Layout = () => {
  const location = useLocation();

  // Hàm xác định key nào đang được chọn dựa trên đường dẫn URL
  const getSelectedKey = () => {
    const path = location.pathname;

    if (path === '/') return ['home'];
    if (path.includes('/bai1/students')) return ['students'];
    if (path.includes('/bai2/projects')) return ['projects'];
    if (path.includes('/bai3/orders')) return ['orders'];
    if (path.includes('/bai4/employees')) return ['employees'];

    return [];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Menu
        mode="horizontal"
        className="bg-blue-500 text-white font-bold"
        theme="dark"
        style={{ background: '#3b82f6' }}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.SubMenu key="bai1" title="Bai 1">
          <Menu.Item key="students">
            <Link to="/bai1/students">Students</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="bai2" title="Bai 2">
          <Menu.Item key="projects">
            <Link to="/bai2/projects">Projects</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="bai3" title="Bai 3">
          <Menu.Item key="orders">
            <Link to="/bai3/orders">Orders</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="bai4" title="Bai 4">
          <Menu.Item key="employees">
            <Link to="/bai4/employees">Employees</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;