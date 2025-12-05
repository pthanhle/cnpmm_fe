import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Alert } from 'antd';
import { formatCurrency } from '@/utils/format';

const BookingModal = ({ visible, onCancel, onSubmit, tour, loading }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible, form]);

    if (!tour) return null;

    const remainingSlots = tour.maxCapacity - tour.currentParticipants;

    return (
        <Modal
            title={<span className="text-xl font-bold text-blue-600">Đặt Tour: {tour.name}</span>}
            open={visible}
            onCancel={onCancel}
            footer={null}
            centered
        >
            <Alert
                message={`Giá tour: ${formatCurrency(tour.price)} / người`}
                type="info"
                showIcon
                className="mb-4"
            />

            <Form layout="vertical" onFinish={onSubmit} form={form}>
                <Form.Item
                    name="fullName"
                    label="Họ và Tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                >
                    <Input placeholder="Nguyễn Văn A" size="large" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ' }
                        ]}
                    >
                        <Input placeholder="example@mail.com" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập SĐT' }]}
                    >
                        <Input placeholder="0909..." size="large" />
                    </Form.Item>
                </div>

                <Form.Item name="address" label="Địa chỉ liên hệ">
                    <Input placeholder="Số nhà, đường, phường, quận..." size="large" />
                </Form.Item>

                <Form.Item
                    name="headcount"
                    label={`Số lượng khách (Còn trống: ${remainingSlots})`}
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                    initialValue={1}
                >
                    <InputNumber
                        min={1}
                        max={remainingSlots}
                        size="large"
                        className="w-full"
                        addonAfter="Người"
                    />
                </Form.Item>

                <div className="flex justify-between items-center mt-6">
                    <span className="text-gray-500 text-sm">* Xác nhận sẽ được gửi qua email.</span>
                    <div className="space-x-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border rounded hover:bg-gray-50 transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition shadow-md disabled:opacity-70 flex-inline items-center"
                        >
                            {loading ? 'Đang xử lý...' : 'Xác Nhận Đặt'}
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};

export default BookingModal;