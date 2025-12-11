import React, { useState } from 'react';
import { Table, Input, Tag, Button, Tooltip, Drawer, Modal, Form, InputNumber } from 'antd';
import { SearchOutlined, HistoryOutlined, DollarCircleOutlined, SwapRightOutlined } from '@ant-design/icons';
import { useContracts, useInternetActions, usePaymentHistory } from '../hooks/useInternet';
import { useDebounce } from '@/hooks/useDebounce'; // Sử dụng hook debounce có sẵn của bạn
import dayjs from 'dayjs';

// --- Sub Component: Payment Modal (Tái sử dụng logic) ---
const PaymentModal = ({ contract, onCancel, onSuccess }) => {
    const { pay, isPaying } = useInternetActions();
    const [form] = Form.useForm();

    const handlePay = async () => {
        try {
            const values = await form.validateFields();
            await pay({ contractId: contract._id, ...values });
            onCancel();
            onSuccess?.();
        } catch (e) { }
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
                    Giá gói: <b className="text-lg text-sky-600">{contract?.packageId?.giaThang.toLocaleString()} đ</b>
                </div>
            </Form>
        </Modal>
    );
};

// --- Sub Component: History Drawer ---
const HistoryDrawer = ({ customerId, onClose }) => {
    const { data: history, isLoading } = usePaymentHistory(customerId, !!customerId);
    return (
        <Drawer title="Lịch sử giao dịch" placement="right" onClose={onClose} open={!!customerId} width={450}>
            {isLoading ? <div className="text-center mt-10">Đang tải dữ liệu...</div> : (
                <div className="space-y-4">
                    {history?.length === 0 && <div className="text-gray-400 text-center mt-10">Chưa có giao dịch nào</div>}
                    {history?.map((pay, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <div className="font-bold text-gray-700">Tháng {pay.thang}/{pay.nam}</div>
                                <div className="text-xs text-gray-400">{dayjs(pay.ngayThanhToan).format('HH:mm DD/MM/YYYY')}</div>
                            </div>
                            <div className="text-green-600 font-semibold">
                                +{pay.soTien.toLocaleString()} đ
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Drawer>
    );
};

// --- MAIN COMPONENT ---
const ContractManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 500); // Delay 500ms
    const { data: contracts, isLoading, refetch } = useContracts(debouncedSearch);

    const [payingContract, setPayingContract] = useState(null);
    const [historyCustomerId, setHistoryCustomerId] = useState(null);

    const columns = [
        {
            title: 'Khách hàng',
            key: 'customer',
            render: (_, r) => (
                <div>
                    <div className="font-semibold text-gray-800">{r.customerId?.hoTen}</div>
                    <div className="text-sm text-gray-500">{r.customerId?.soDienThoai}</div>
                </div>
            )
        },
        {
            title: 'Gói dịch vụ',
            dataIndex: ['packageId', 'tenGoi'],
            render: (text) => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'Thời hạn',
            key: 'duration',
            render: (_, r) => (
                <div className="text-sm">
                    <span className="text-gray-500">{dayjs(r.ngayBatDau).format('DD/MM/YY')}</span>
                    <SwapRightOutlined className="mx-2 text-gray-300" />
                    <span className={dayjs(r.ngayKetThuc).isBefore(dayjs()) ? 'text-red-500 font-bold' : 'text-gray-700 font-medium'}>
                        {dayjs(r.ngayKetThuc).format('DD/MM/YY')}
                    </span>
                </div>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            render: (status, r) => {
                // Logic hiển thị trạng thái thông minh hơn
                const isExpired = dayjs(r.ngayKetThuc).isBefore(dayjs());
                if (status === 'CANCELLED') return <Tag color="default">Đã hủy</Tag>;
                if (isExpired) return <Tag color="error">Hết hạn</Tag>;
                return <Tag color="success">Đang hoạt động</Tag>;
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <div className="flex justify-end gap-2">
                    <Tooltip title="Thanh toán cước">
                        <Button
                            icon={<DollarCircleOutlined />}
                            className="text-green-600 border-green-200 hover:!text-green-500 hover:!border-green-400"
                            onClick={() => setPayingContract(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Xem lịch sử">
                        <Button
                            icon={<HistoryOutlined />}
                            onClick={() => setHistoryCustomerId(record.customerId?._id)}
                        />
                    </Tooltip>
                </div>
            )
        }
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-lg font-bold text-gray-800 whitespace-nowrap">Danh sách Hợp đồng</h3>
                <Input
                    placeholder="Tìm theo tên hoặc SĐT..."
                    prefix={<SearchOutlined className="text-gray-400" />}
                    size="large"
                    className="max-w-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    allowClear
                />
            </div>

            <Table
                columns={columns}
                dataSource={contracts}
                rowKey="_id"
                loading={isLoading}
                pagination={{ pageSize: 8 }}
                className="flex-1"
            />

            <PaymentModal
                contract={payingContract}
                onCancel={() => setPayingContract(null)}
                onSuccess={refetch}
            />

            <HistoryDrawer
                customerId={historyCustomerId}
                onClose={() => setHistoryCustomerId(null)}
            />
        </div>
    );
};

export default ContractManagement;