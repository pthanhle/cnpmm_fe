import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Alert } from 'antd';
import { useInternetActions } from '../hooks/useInternet';

const RegistrationModal = ({ open, onCancel, packageData }) => {
    const [form] = Form.useForm();
    const { register, isRegistering } = useInternetActions();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await register({
                ...values,
                packageId: packageData._id,
            });
            form.resetFields();
            onCancel();
        } catch (e) {
            // Validate fail
        }
    };

    return (
        <Modal
            title={<div className="text-xl font-bold text-gray-800">Đăng ký dịch vụ</div>}
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
            confirmLoading={isRegistering}
            okText="Xác nhận & Ký Hợp đồng"
            cancelText="Hủy"
            width={600}
            centered
        >
            {packageData && (
                <Alert
                    message={`Bạn đang đăng ký gói: ${packageData.tenGoi}`}
                    description={`Tốc độ: ${packageData.tocDoMbps} Mbps - Giá: ${packageData.giaThang.toLocaleString()} đ/tháng`}
                    type="info"
                    showIcon
                    className="mb-6 rounded-lg border-sky-100 bg-sky-50"
                />
            )}

            <Form form={form} layout="vertical" initialValues={{ durationMonths: 12 }}>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Họ và tên" name="hoTen" rules={[{ required: true }]}>
                        <Input placeholder="Nguyễn Văn A" size="large" />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="soDienThoai" rules={[{ required: true }]}>
                        <Input placeholder="09xxxxxxx" size="large" />
                    </Form.Item>
                </div>

                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                    <Input placeholder="email@example.com" size="large" />
                </Form.Item>

                <Form.Item label="Địa chỉ lắp đặt" name="diaChi" rules={[{ required: true }]}>
                    <Input.TextArea rows={2} placeholder="Số nhà, đường, phường, quận..." />
                </Form.Item>

                <Form.Item label="Thời hạn hợp đồng (Tháng)" name="durationMonths" rules={[{ required: true }]}>
                    <Select size="large">
                        <Select.Option value={6}>6 Tháng</Select.Option>
                        <Select.Option value={12}>12 Tháng</Select.Option>
                        <Select.Option value={24}>24 Tháng</Select.Option>
                    </Select>
                </Form.Item>
            </Form>

            <div className="text-xs text-gray-500 mt-4 text-center">
                * Phí lắp đặt 200.000đ sẽ được thu tại nhà sau khi kỹ thuật viên khảo sát.
            </div>
        </Modal>
    );
};

export default RegistrationModal;