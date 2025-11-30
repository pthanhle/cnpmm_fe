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
            title={editingOrder ? 'Sửa Đơn Hàng' : 'Thêm Đơn Hàng'}
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
        >
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item name="orderId" label="Mã Đơn Hàng" rules={[{ required: true }]}>
                    <Input disabled={!!editingOrder} />
                </Form.Item>
                <Form.Item name="productName" label="Tên Sản Phẩm" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="quantity" label="Số Lượng" rules={[{ required: true }]}>
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="price" label="Đơn Giá" rules={[{ required: true }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrderModal;