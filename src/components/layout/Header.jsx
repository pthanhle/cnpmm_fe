import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import ThemeToggle from '../atoms/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import LanguageSwitch from '../atoms/LanguageSwitch';

const { Header: AntHeader } = Layout;

const Header = () => {
    const location = useLocation();
    const { isDarkMode } = useTheme();

    const getSelectedKey = () => {
        const path = location.pathname;
        if (path === '/') return ['home'];
        if (path.includes('/bai2/projects')) return ['projects'];
        if (path.includes('/bai3/orders')) return ['orders'];
        return [];
    };

    return (
        <AntHeader
            className="flex items-center justify-between shadow-md sticky top-0 z-50 w-full px-6 transition-colors duration-300 bg-white dark:bg-[#001529]"
            style={{
                padding: 0,
                height: '64px',
                lineHeight: '64px'
            }}
        >
            <Menu
                mode="horizontal"
                className="border-b-0 flex-1 min-w-0 font-medium bg-transparent dark:text-gray-200"

                theme={isDarkMode ? 'dark' : 'light'}

                selectedKeys={getSelectedKey()}
                style={{ borderBottom: 'none', lineHeight: '64px', background: 'transparent' }}
            >
                <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>

                <Menu.SubMenu key="bai1" title="Bai 1">
                    <Menu.Item key="orders"><Link to="/bai1/orders">Orders</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="bai2" title="Bai 2">
                    <Menu.Item key="projects"><Link to="/bai2/projects">Projects</Link></Menu.Item>
                </Menu.SubMenu>


            </Menu>

            <div className="ml-4 flex items-center gap-2">
                <ThemeToggle />
                <LanguageSwitch />
            </div>
        </AntHeader>
    );
};

export default Header;