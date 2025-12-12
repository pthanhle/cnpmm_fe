import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import {
    HomeOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    TeamOutlined
} from '@ant-design/icons';
import ThemeToggle from '../atoms/ThemeToggle';
import LanguageSwitch from '../atoms/LanguageSwitch';
import { useTheme } from '@/context/ThemeContext';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
    const location = useLocation();
    const { isDarkMode } = useTheme();
    const [selectedKeys, setSelectedKeys] = useState(['home']);

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            setSelectedKeys(['home']);
        } else if (path.includes('/orders')) {
            setSelectedKeys(['orders']);
        } else if (path.includes('/employees')) {
            setSelectedKeys(['employees']);
        }
    }, [location]);

    const items = [
        {
            label: <Link to="/">Trang Chủ</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/bai1/orders">(Bài 1)</Link>,
            key: 'orders',
            icon: <ShoppingCartOutlined />,
        },
        {
            label: <Link to="/bai2/employees">(Bài 2)</Link>,
            key: 'employees',
            icon: <TeamOutlined />,
        },
    ];

    return (
        <AntHeader
            className="sticky top-0 z-50 w-full px-6 flex items-center justify-between shadow-sm transition-colors duration-300"
            style={{
                background: isDarkMode ? '#001529' : '#ffffff',
                borderBottom: isDarkMode ? '1px solid #303030' : '1px solid #f0f0f0',
                height: '64px',
                paddingInline: '24px'
            }}
        >
            {/* Logo Area */}
            <div className="flex items-center gap-3 mr-8 cursor-pointer" onClick={() => window.location.href = '/'}>
                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-lg">
                    T
                </div>
                <Title level={5} style={{ margin: 0, color: isDarkMode ? 'white' : 'inherit' }} className="hidden md:block">
                    12/12/2025
                </Title>
            </div>

            {/* Navigation Menu */}
            <Menu
                mode="horizontal"
                selectedKeys={selectedKeys}
                items={items}
                theme={isDarkMode ? 'dark' : 'light'}
                className="flex-1 border-b-0 min-w-0 bg-transparent"
                style={{
                    background: 'transparent',
                    borderBottom: 'none',
                    lineHeight: '64px'
                }}
                disabledOverflow
            />

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-auto">
                <LanguageSwitch />
                <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-600 mx-1"></div>
                <ThemeToggle />
            </div>
        </AntHeader>
    );
};

export default Header;