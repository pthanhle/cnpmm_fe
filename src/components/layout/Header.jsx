import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Layout, Button, Dropdown, Space, Avatar } from 'antd';
import { AppstoreOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import ThemeToggle from '../atoms/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const { Header: AntHeader } = Layout;

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const { isAuthenticated, user, logout } = useAuth();

    const getSelectedKey = () => {
        const path = location.pathname;

        if (path === '/') return ['home'];

        if (path.includes('/admin/tours')) return ['admin-tours'];
        if (path.includes('/admin/bookings')) return ['admin-bookings'];
        if (path.includes('/admin/dashboard')) return ['admin-stats'];

        if (path.includes('/tours')) return ['public-tours'];

        return [];
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const userMenuItems = [
        {
            key: 'logout',
            label: 'Đăng Xuất',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
            danger: true,
        }
    ];

    return (
        <AntHeader
            className="px-6 flex items-center justify-between shadow-sm sticky top-0 z-50 w-full bg-white dark:bg-[#001529] transition-colors duration-300"
            style={{ padding: 0, height: '64px', lineHeight: '64px' }}
        >
            <div className="flex items-center ml-6 mr-8 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-8 h-8 bg-blue-600 rounded mr-2 flex items-center justify-center text-white font-bold">
                    <AppstoreOutlined />
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-white hidden md:block select-none">
                    Travel App
                </span>
            </div>

            <Menu
                mode="horizontal"
                className="border-b-0 flex-1 min-w-0 font-medium bg-transparent dark:text-gray-200"
                theme={isDarkMode ? 'dark' : 'light'}
                selectedKeys={getSelectedKey()}
                style={{ borderBottom: 'none', lineHeight: '64px', background: 'transparent' }}
            >
                <Menu.Item key="home"><Link to="/">Trang Chủ</Link></Menu.Item>

                <Menu.Item key="public-tours"><Link to="/tours">Khám Phá Tour</Link></Menu.Item>

                {user?.role === 'admin' && (
                    <>
                        <Menu.Item key="admin-tours"><Link to="/admin/tours">QL Tour</Link></Menu.Item>
                        <Menu.Item key="admin-bookings"><Link to="/admin/bookings">QL Đơn Hàng</Link></Menu.Item>
                        <Menu.Item key="admin-stats"><Link to="/admin/dashboard">Dashboard</Link></Menu.Item>
                    </>
                )}
            </Menu>

            <div className="mr-6 flex items-center gap-4">
                <ThemeToggle />

                {isAuthenticated ? (
                    <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                        <Space className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors">
                            <Avatar style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />}>
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <span className="font-medium text-gray-700 dark:text-gray-200 hidden md:inline">
                                {user?.name}
                            </span>
                        </Space>
                    </Dropdown>
                ) : (
                    <Button type="primary" icon={<LoginOutlined />} onClick={() => navigate('/login')}>
                        Đăng Nhập
                    </Button>
                )}
            </div>
        </AntHeader>
    );
};

export default Header;