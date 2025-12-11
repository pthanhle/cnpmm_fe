import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import ThemeToggle from '../atoms/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSwitch from '../atoms/LanguageSwitch';
import { HomeOutlined, GlobalOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const Header = () => {
    const location = useLocation();
    const { isDarkMode } = useTheme();

    const getSelectedKey = () => {
        const path = location.pathname;
        if (path === '/') return ['home'];
        if (path.includes('/internet-manager')) return ['internet'];
        return [];
    };

    const menuItems = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <Link to="/">Trang chủ</Link>,
        },
        {
            key: 'internet',
            icon: <GlobalOutlined />,
            label: <Link to="/internet-manager">Quản lý Internet</Link>,
        }
    ];

    return (
        <AntHeader
            className="flex items-center justify-between shadow-sm sticky top-0 z-50 w-full px-6 transition-colors duration-300 bg-white dark:bg-[#001529]"
            style={{
                padding: '0 24px',
                height: '64px',
                lineHeight: '64px'
            }}
        >
            {/* Logo hoặc Brand Name (Optional) */}
            <div className="text-xl font-bold mr-8 text-sky-600 dark:text-sky-400 flex items-center gap-2">
                <GlobalOutlined /> 22110228
            </div>

            <Menu
                mode="horizontal"
                className="flex-1 min-w-0 font-medium bg-transparent border-b-0 dark:text-gray-200"
                theme={isDarkMode ? 'dark' : 'light'}
                selectedKeys={getSelectedKey()}
                items={menuItems}
                style={{ lineHeight: '64px' }}
            />

            <div className="ml-4 flex items-center gap-4">
                <ThemeToggle />
                <LanguageSwitch />
            </div>
        </AntHeader>
    );
};

export default Header;