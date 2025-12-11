import React, { useState } from 'react';
import { Table, Tag, Button, Tabs, Tooltip, Modal, Form, InputNumber, Drawer, Timeline } from 'antd';
import { BellOutlined, HistoryOutlined, DollarCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useStats, useInternetActions, usePaymentHistory } from '../hooks/useInternet';
import dayjs from 'dayjs';

// --- Sub Component: Payment Modal ---
const PaymentModal = ({ contract, onCancel, onSuccess }) => {
    const { pay, isPaying } = useInternetActions();
    const [form] = Form.useForm();

    const handlePay = async () => {
        const values = await form.validateFields();
        await pay({ contractId: contract._id, ...values });
        onCancel();
        onSuccess?.();
    };

    return (
        <Modal title="Thanh toán cước" open={!!contract} onCancel={onCancel} onOk={handlePay} confirmLoading={isPaying}>
            <Form form={form} layout="vertical" initialValues={{ thang: dayjs().month() + 1, nam: dayjs().year() }}>
                <div className="flex gap-4">
                    <Form.Item label="Tháng" name="thang" className="flex-1" rules={[{ required: true }]}>
                        <InputNumber min={1} max={12} className="w-full" />
                    </Form.Item>
                    <Form.Item label="Năm" name="nam" className="flex-1" rules={[{ required: true }]}>
                        <InputNumber min={2020} className="w-full" />
                    </Form.Item>
                </div>
                <div className="bg-gray-50 p-4 rounded text-right">
                    Số tiền: <b className="text-lg text-green-600">{contract?.packageId?.giaThang.toLocaleString()} đ</b>
                </div>
            </Form>
        </Modal>
    );
};

// --- Sub Component: History Drawer ---
const HistoryDrawer = ({ customerId, onClose }) => {
    const { data: history, isLoading } = usePaymentHistory(customerId, !!customerId);

    return (
        <Drawer title="Lịch sử thanh toán" placement="right" onClose={onClose} open={!!customerId} width={400}>
            {isLoading ? <div className="text-center p-4">Đang tải...</div> : (
                <Timeline mode="left" className="mt-4">
                    {history?.length === 0 && <div className="text-gray-400">Chưa có lịch sử thanh toán</div>}
                    {history?.map(pay => (
                        <Timeline.Item key={pay._id} color="green" label={dayjs(pay.ngayThanhToan).format('DD/MM/YYYY')}>
                            <p className="font-bold m-0">Tháng {pay.thang}/{pay.nam}</p>
                            <p className="text-gray-500 m-0">{pay.soTien.toLocaleString()} đ</p>
                        </Timeline.Item>
                    ))}
                </Timeline>
            )}
        </Drawer>
    );
};

// --- Main Component ---
const StatsManager = () => {
    const { data: stats, isLoading, refetch } = useStats();
    const { notify, isNotifying } = useInternetActions();

    const [payingContract, setPayingContract] = useState(null);
    const [viewHistoryId, setViewHistoryId] = useState(null);

    const columns = [
        {
            title: 'Khách hàng',
            key: 'customer',
            render: (_, r) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <UserOutlined />
                    </div>
                    <div>
                        <div className="font-semibold">{r.customerId?.hoTen}</div>
                        <div className="text-xs text-gray-400">{r.customerId?.soDienThoai}</div>
                    </div>
                </div>
            )
        },
        {
            title: 'Gói cước',
            dataIndex: ['packageId', 'tenGoi'],
            render: (text) => <Tag color="cyan">{text}</Tag>
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'ngayKetThuc',
            render: (date) => <span className="font-mono text-rose-600">{dayjs(date).format('DD/MM/YYYY')}</span>,
            sorter: (a, b) => new Date(a.ngayKetThuc) - new Date(b.ngayKetThuc),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Tooltip title="Thanh toán">
                        <Button size="small" icon={<DollarCircleOutlined />} onClick={() => setPayingContract(record)} />
                    </Tooltip>
                    <Tooltip title="Lịch sử">
                        <Button size="small" icon={<HistoryOutlined />} onClick={() => setViewHistoryId(record.customerId?._id)} />
                    </Tooltip>
                </div>
            )
        }
    ];

    const items = [
        {
            key: '1',
            label: <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500" /> Sắp hết hạn <Tag className="ml-2">{stats?.aboutToExpire?.length || 0}</Tag></span>,
            children: <Table dataSource={stats?.aboutToExpire} columns={columns} rowKey="_id" loading={isLoading} pagination={{ pageSize: 5 }} />
        },
        {
            key: '2',
            label: <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> Đã hết hạn <Tag color="error" className="ml-2">{stats?.expired?.length || 0}</Tag></span>,
            children: <Table dataSource={stats?.expired} columns={columns} rowKey="_id" loading={isLoading} pagination={{ pageSize: 5 }} />
        }
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Trung tâm kiểm soát</h3>
                <Button
                    type="primary"
                    danger
                    icon={<BellOutlined />}
                    onClick={() => notify()}
                    loading={isNotifying}
                    className="rounded-lg shadow-red-100 shadow-md"
                >
                    Gửi thông báo nhắc cước
                </Button>
            </div>

            <Tabs defaultActiveKey="1" items={items} />

            <PaymentModal
                contract={payingContract}
                onCancel={() => setPayingContract(null)}
                onSuccess={refetch}
            />

            <HistoryDrawer
                customerId={viewHistoryId}
                onClose={() => setViewHistoryId(null)}
            />
        </div>
    );
};

export default StatsManager;