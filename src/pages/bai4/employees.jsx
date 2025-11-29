import React, { useState, useEffect } from 'react';
import { message, Card, Typography, Spin, Statistic, Row, Col, Modal } from 'antd';
import { UserOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, searchEmployees, getEmployeeMonthlySalary } from '../../services/api';

// Import Components
import EmployeeFilter from './components/EmployeeFilter';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';

const { Title } = Typography;

const Employees = () => {
    // --- State ---
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filter
    const [searchTerm, setSearchTerm] = useState('');

    // Modal Form
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    // --- Effects ---
    useEffect(() => {
        fetchEmployees();
    }, []);

    // --- API Handlers ---
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await getEmployees();
            setEmployees(Array.isArray(response) ? response : []);
        } catch (error) {
            setEmployees([]);
            message.error('Lỗi tải danh sách: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            if (!searchTerm.trim()) {
                await fetchEmployees();
                return;
            }
            const response = await searchEmployees(searchTerm);
            setEmployees(Array.isArray(response) ? response : []);
        } catch (error) {
            message.error('Lỗi tìm kiếm: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            message.success('Xóa thành công');
            fetchEmployees();
        } catch (error) {
            message.error('Lỗi xóa: ' + error.message);
        }
    };

    const handleFormSubmit = async (values) => {
        try {
            if (editingEmployee) {
                await updateEmployee(editingEmployee._id, values);
                message.success('Cập nhật thành công');
            } else {
                await createEmployee(values);
                message.success('Thêm thành công');
            }
            setIsModalVisible(false);
            fetchEmployees();
        } catch (error) {
            message.error('Lỗi lưu dữ liệu: ' + error.message);
        }
    };

    // Hàm riêng biệt cho chức năng tính lương
    const handleGetSalary = async (id) => {
        try {
            const response = await getEmployeeMonthlySalary(id);
            // Hiển thị lương đẹp mắt bằng Modal thay vì message đơn giản
            Modal.info({
                title: 'Thông Tin Lương',
                content: (
                    <div className="text-center py-4">
                        <p className="text-gray-500">Tổng lương tháng này là:</p>
                        <h2 className="text-2xl font-bold text-green-600">
                            {response.monthlySalary?.toLocaleString('vi-VN')} VNĐ
                        </h2>
                    </div>
                ),
                icon: <DollarCircleOutlined style={{ color: '#52c41a' }} />,
                okText: 'Đóng',
            });
        } catch (error) {
            message.error('Lỗi tính lương: ' + error.message);
        }
    };

    const openModal = (record = null) => {
        setEditingEmployee(record);
        setIsModalVisible(true);
    };

    // Tính nhanh tổng số nhân viên (Client-side stats)
    const totalEmployees = employees.length;

    // --- Render ---
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <Title level={2} style={{ margin: 0, color: '#1f2937' }}>Quản Lý Nhân Viên</Title>
                </div>

                {/* Simple Stats Dashboard */}
                <Row gutter={16}>
                    <Col span={6}>
                        <Card hoverable className="bg-blue-50 border-blue-100">
                            <Statistic
                                title="Tổng Số Nhân Viên"
                                value={totalEmployees}
                                prefix={<UserOutlined />}
                                valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Main Content */}
                <Card className="shadow-sm" bodyStyle={{ padding: '24px' }}>
                    <div className="mb-6">
                        <EmployeeFilter
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onSearch={handleSearch}
                            onOpenModal={() => openModal(null)}
                        />
                    </div>

                    {loading ? (
                        <div className="p-10 text-center"><Spin size="large" /></div>
                    ) : (
                        <EmployeeTable
                            employees={employees}
                            loading={loading}
                            onEdit={openModal}
                            onDelete={handleDelete}
                            onGetSalary={handleGetSalary}
                        />
                    )}
                </Card>

                {/* Modal Form */}
                <EmployeeModal
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    onSubmit={handleFormSubmit}
                    editingEmployee={editingEmployee}
                />
            </div>
        </div>
    );
};

export default Employees;