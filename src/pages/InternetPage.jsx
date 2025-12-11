import React from 'react';
import { Typography, Tabs } from 'antd';
import { LaptopOutlined, DashboardOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';

// Components
import PackageList from '../features/internet/components/PackageList';
import StatsManager from '../features/internet/components/StatsManager';
import PackageManagement from '../features/internet/components/PackageManagement';
import ContractManagement from '../features/internet/components/ContractManagement'; // Import mới
import { usePackages } from '../features/internet/hooks/useInternet';
import Loading from '../components/atoms/Loading';

const { Title, Paragraph } = Typography;

const InternetPage = () => {
    const { data: packages, isLoading } = usePackages();

    if (isLoading) return <Loading />;

    const items = [
        {
            key: 'all_contracts',
            label: <span className="text-base px-2"><UnorderedListOutlined /> Danh sách Hợp đồng</span>,
            children: <ContractManagement />,
        },
        {
            key: 'stats',
            label: <span className="text-base px-2"><DashboardOutlined /> Cảnh báo & Thống kê</span>,
            children: <StatsManager />,
        },
        {
            key: 'packages_register',
            label: <span className="text-base px-2"><LaptopOutlined /> Đăng ký Dịch vụ</span>,
            children: <PackageList packages={packages} />,
        },
        {
            key: 'admin_packages',
            label: <span className="text-base px-2"><SettingOutlined /> Cấu hình Gói cước</span>,
            children: <PackageManagement />,
        },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">
            <div className="text-center py-6 bg-white rounded-b-2xl shadow-sm border-t border-gray-100 mb-6">
                <Title level={2} className="!mb-1 !text-sky-700">Hệ thống Quản lý ISP</Title>
                <Paragraph type="secondary" className="text-base">
                    Quản lý toàn diện thuê bao Internet
                </Paragraph>
            </div>

            <Tabs
                defaultActiveKey="all_contracts"
                items={items}
                type="card"
                size="large"
                className="custom-tabs"
                destroyInactiveTabPane={true}
            />
        </div>
    );
};

export default InternetPage;