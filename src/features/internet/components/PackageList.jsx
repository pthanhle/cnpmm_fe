import React, { useState } from 'react';
import { Card, Button, Tag, Typography } from 'antd';
import { RocketOutlined, CheckCircleOutlined } from '@ant-design/icons';
import RegistrationModal from './RegistrationModal';

const { Title, Text } = Typography;

const PackageList = ({ packages }) => {
    const [selectedPkg, setSelectedPkg] = useState(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages?.map((pkg) => (
                    <Card
                        key={pkg._id}
                        hoverable
                        className="rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-t-sky-500 overflow-hidden group"
                        bodyStyle={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-sky-50 rounded-full text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                <RocketOutlined style={{ fontSize: '24px' }} />
                            </div>
                            <Tag color="blue" className="mr-0 rounded-full px-3">{pkg.tocDoMbps} Mbps</Tag>
                        </div>

                        <Title level={4} className="mb-1">{pkg.tenGoi}</Title>
                        <Text type="secondary" className="block mb-4 h-10 line-clamp-2">{pkg.moTa}</Text>

                        <div className="mt-auto">
                            <div className="text-2xl font-bold text-gray-800 mb-6">
                                {pkg.giaThang.toLocaleString('vi-VN')} <span className="text-sm font-normal text-gray-400">VNĐ/tháng</span>
                            </div>

                            <Button
                                type="primary"
                                block
                                size="large"
                                className="bg-sky-600 hover:!bg-sky-500 rounded-xl h-12 font-semibold shadow-sky-200 shadow-lg"
                                onClick={() => setSelectedPkg(pkg)}
                            >
                                Đăng ký ngay
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <RegistrationModal
                open={!!selectedPkg}
                onCancel={() => setSelectedPkg(null)}
                packageData={selectedPkg}
            />
        </>
    );
};

export default PackageList;