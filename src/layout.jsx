import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu } from 'antd';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100"> {/* Tailwind cho background */}
      {/* Navbar sử dụng Ant Design Menu */}
      <Menu mode="horizontal" className="bg-blue-500 text-white"> {/* Tailwind kết hợp với Ant Design class */}
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.SubMenu key="bai1" title="Bai 1">
          <Menu.Item key="students">
            <Link to="/bai1/students">Students</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="bai2" title="Bai 2">
          <Menu.Item key="example">
            <Link to="/bai2/example">Example</Link>
          </Menu.Item>
        </Menu.SubMenu>
        {/* Thêm các SubMenu khác nếu cần cho bai3, bai4,... */}
      </Menu>

      {/* Nội dung trang sẽ render ở đây */}
      <div className="p-4"> {/* Tailwind cho padding */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;