import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const OrderModal = ({ visible, onCancel, onSubmit, editingOrder }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (editingOrder) {
                form.setFieldsValue(editingOrder);
            } else {
                form.resetFields();
            }
        }
    }, [visible, editingOrder, form]);

    return (
        <Modal
            title={editingOrder ? 'Cập Nhật Đơn Hàng' : 'Tạo Đơn Hàng Mới'}
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText={editingOrder ? "Lưu Thay Đổi" : "Tạo Mới"}
            cancelText="Hủy"
        >
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item name="orderId" label="Mã Đơn Hàng" rules={[{ required: true, message: 'Vui lòng nhập mã đơn' }]}>
                    <Input disabled={!!editingOrder} placeholder="DH001" />
                </Form.Item>

                <Form.Item name="productName" label="Tên Sản Phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
                    <Input placeholder="Laptop, Điện thoại..." />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="quantity" label="Số Lượng" rules={[{ required: true, message: 'Nhập số lượng' }]}>
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="price" label="Đơn Giá" rules={[{ required: true, message: 'Nhập đơn giá' }]}>
                        <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default OrderModal;