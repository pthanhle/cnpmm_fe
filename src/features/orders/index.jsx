import React, { useState } from 'react';
import { Card, Button, Input, DatePicker, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '@/hooks/useDebounce';
import OrderTable from './components/OrderTable';
import OrderModal from './components/OrderModal';
import { useOrders, useOrderMutation } from './hooks/useOrders';

const { RangePicker } = DatePicker;

const OrderFeature = () => {
    // 1. State Management
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);

    // 2. Debounce
    const debouncedKeyword = useDebounce(keyword, 500);

    // 3. Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    // 4. API Hooks
    const { data, isLoading } = useOrders({
        page,
        limit: pageSize,
        keyword: debouncedKeyword,
        startDate: dateRange[0] ? dateRange[0].toISOString() : undefined,
        endDate: dateRange[1] ? dateRange[1].toISOString() : undefined,
    });

    const { create, update, remove } = useOrderMutation();

    // 5. Handlers
    const handleTableChange = (pagination) => {
        setPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const handleSubmit = (values) => {
        if (editingOrder) {
            update.mutate({ id: editingOrder._id, data: values }, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingOrder(null);
                }
            });
        } else {
            create.mutate(values, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const handleOpenEdit = (record) => {
        setEditingOrder(record);
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setEditingOrder(null);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <Card
                title="Quản lý Đơn Hàng"
                className="shadow-lg dark:bg-[#141414] dark:border-gray-700"
                extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
                        Tạo Đơn Hàng
                    </Button>
                }
            >
                {/* --- Filter Section --- */}
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} md={10}>
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Tìm tên khách hàng..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            allowClear
                        />
                    </Col>
                    <Col xs={24} md={10}>
                        <RangePicker
                            className="w-full"
                            format="DD/MM/YYYY"
                            placeholder={['Từ ngày', 'Đến ngày']}
                            onChange={(dates) => setDateRange(dates || [null, null])}
                        />
                    </Col>
                </Row>

                {/* --- Table Section --- */}
                <OrderTable
                    data={data?.data}
                    pagination={{
                        current: data?.meta?.current || 1,
                        pageSize: data?.meta?.pageSize || 10,
                        total: data?.meta?.total || 0,
                    }}
                    isLoading={isLoading}
                    onChange={handleTableChange}
                    onEdit={handleOpenEdit}
                    onDelete={(id) => remove.mutate(id)}
                />
            </Card>

            {/* --- Modal Section --- */}
            <OrderModal
                open={isModalOpen}
                initialValues={editingOrder}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                loading={create.isPending || update.isPending}
            />
        </div>
    );
};

export default OrderFeature;