import React, { useState } from 'react';
import { Card, Typography, Spin, Statistic, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEmployees } from './hooks/useEmployees';
import PageHeaderAction from '../../components/molecules/PageHeaderAction';
import { EmployeeTable, EmployeeModal } from './components';

const { Title } = Typography;

const EmployeeFeature = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { employees, loading, isModalVisible, editingEmployee, openModal, closeModal, handleSearch, handleDelete, handleFormSubmit, handleGetSalary } = useEmployees();
    const onSearch = () => handleSearch(searchTerm);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <Title level={2} style={{ margin: 0, color: '#1f2937' }}>Quản Lý Nhân Viên</Title>
                </div>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card hoverable className="bg-blue-50 border-blue-100">
                            <Statistic title="Tổng Số Nhân Viên" value={employees.length} prefix={<UserOutlined />} valueStyle={{ color: '#1890ff', fontWeight: 'bold' }} />
                        </Card>
                    </Col>
                </Row>
                <Card className="shadow-sm" bodyStyle={{ padding: '24px' }}>
                    <div className="mb-6">
                        <PageHeaderAction
                            searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={onSearch}
                            onAdd={() => openModal(null)} placeholder="Tìm kiếm nhân viên..." btnLabel="Thêm Nhân Viên"
                        />
                    </div>
                    {loading ? <div className="p-10 text-center"><Spin size="large" /></div> :
                        <EmployeeTable employees={employees} loading={loading} onEdit={openModal} onDelete={handleDelete} onGetSalary={handleGetSalary} />
                    }
                </Card>
                <EmployeeModal visible={isModalVisible} onCancel={closeModal} onSubmit={handleFormSubmit} editingEmployee={editingEmployee} />
            </div>
        </div>
    );
};

export default EmployeeFeature;