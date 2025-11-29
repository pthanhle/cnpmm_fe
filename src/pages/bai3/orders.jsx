import React, { useState, useEffect } from 'react';
import { message, Spin, Card, Typography, Statistic, Row, Col, Divider } from 'antd'; // Thêm Divider
import { DollarCircleOutlined, AreaChartOutlined } from '@ant-design/icons'; // Thêm icon cho báo cáo
import { getOrders, createOrder, updateOrder, deleteOrder, getOrderTotalValue, getOrderRevenueReport } from '../../services/api';

import OrderFilter from './components/OrderFilter';
import OrderTable from './components/OrderTable';
import RevenueReport from './components/RevenueReport';
import OrderModal from './components/OrderModal';

const { Title } = Typography;

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [revenueReport, setRevenueReport] = useState([]);

    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        fetchOrders();
        fetchTotalValue();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await getOrders();
            setOrders(Array.isArray(response) ? response : []);
        } catch (error) {
            setOrders([]);
            message.error('Lỗi tải danh sách: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchTotalValue = async () => {
        try {
            const response = await getOrderTotalValue();
            setTotalValue(response.totalValue || 0);
        } catch (error) {
            console.error(error);
        }
    };

    const handleReport = async () => {
        if (!startDate || !endDate) {
            message.warning('Vui lòng chọn đầy đủ khoảng thời gian.');
            return;
        }
        try {
            const response = await getOrderRevenueReport(startDate, endDate);
            setRevenueReport(Array.isArray(response) ? response : []);
            message.success('Báo cáo doanh thu đã được tạo.');
            // Scroll xuống dưới để user thấy báo cáo vừa hiện
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } catch (error) {
            message.error('Lỗi tạo báo cáo: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id);
            message.success('Xóa thành công');
            fetchOrders();
            fetchTotalValue();
        } catch (error) {
            message.error('Lỗi xóa: ' + error.message);
        }
    };

    const handleFormSubmit = async (values) => {
        try {
            if (editingOrder) {
                await updateOrder(editingOrder._id, values);
                message.success('Cập nhật thành công');
            } else {
                await createOrder(values);
                message.success('Thêm thành công');
            }
            setIsModalVisible(false);
            fetchOrders();
            fetchTotalValue();
        } catch (error) {
            message.error('Lỗi: ' + error.message);
        }
    };

    const openModal = (record = null) => {
        setEditingOrder(record);
        setIsModalVisible(true);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Title level={2} style={{ margin: 0, color: '#1f2937' }}>Quản Lý Đơn Hàng</Title>
                </div>

                {/* Dashboard & Filter */}
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={8} lg={6}>
                        <Card hoverable className="h-full flex flex-col justify-center items-center bg-white border-blue-100 shadow-sm">
                            <Statistic
                                title={<span className="text-gray-500 font-semibold">Tổng Doanh Thu</span>}
                                value={totalValue}
                                precision={0}
                                valueStyle={{ color: '#2563eb', fontWeight: 'bold', fontSize: '1.5rem' }}
                                prefix={<DollarCircleOutlined className="mr-2" />}
                                suffix="VNĐ"
                            />
                        </Card>
                    </Col>

                    <Col xs={24} md={16} lg={18}>
                        <Card className="h-full shadow-sm" bodyStyle={{ padding: '24px' }}>
                            <OrderFilter
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                                onReport={handleReport}
                                onOpenModal={() => openModal(null)}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Table Section */}
                <Card
                    title="Danh Sách Đơn Hàng"
                    className="shadow-sm mt-6"
                    headStyle={{ fontWeight: 'bold' }}
                >
                    {loading ? (
                        <div className="p-10 text-center"><Spin size="large" /></div>
                    ) : (
                        <OrderTable
                            orders={orders}
                            loading={loading}
                            onEdit={openModal}
                            onDelete={handleDelete}
                        />
                    )}
                </Card>

                {/* Revenue Report Section - Đã thêm mt-10 để tách biệt */}
                {revenueReport.length > 0 && (
                    <div className="mt-10 animate-fade-in-up"> {/* Wrapper tạo khoảng cách */}
                        <Divider orientation="left" style={{ borderColor: '#10b981' }}>
                            <span className="text-green-600 font-bold text-lg">
                                <AreaChartOutlined className="mr-2" /> Kết Quả Báo Cáo
                            </span>
                        </Divider>

                        <Card className="shadow-md border-t-4 border-t-green-500 bg-green-50">
                            <RevenueReport data={revenueReport} />
                        </Card>
                    </div>
                )}

                {/* Modal */}
                <OrderModal
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    onSubmit={handleFormSubmit}
                    editingOrder={editingOrder}
                />
            </div>
        </div>
    );
};

export default Orders;