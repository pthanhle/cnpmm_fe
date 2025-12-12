import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Table, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const OrderModal = ({ open, onClose, onSubmit, initialValues, loading }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                form.resetFields();
                // Mặc định ít nhất 1 sản phẩm
                form.setFieldsValue({ sanPham: [{}] });
            }
        }
    }, [open, initialValues, form]);

    const handleFinish = (values) => {
        onSubmit(values);
    };

    return (
        <Modal
            title={initialValues ? `Sửa Đơn Hàng ${initialValues.maDH}` : "Tạo Đơn Hàng Mới"}
            open={open}
            onCancel={onClose}
            footer={null} // Dùng nút submit của Form
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{ sanPham: [{}] }}
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="maDH"
                        label="Mã Đơn Hàng"
                        rules={[{ required: true, message: 'Nhập mã đơn' }]}
                    >
                        <Input disabled={!!initialValues} placeholder="DH001" />
                    </Form.Item>

                    <Form.Item
                        name="khachHang"
                        label="Tên Khách Hàng"
                        rules={[{ required: true, message: 'Nhập tên khách hàng' }]}
                    >
                        <Input placeholder="Nguyễn Văn A" />
                    </Form.Item>
                </div>

                {/* Danh sách sản phẩm động */}
                <Form.List name="sanPham">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" className="w-full">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'tenSP']}
                                        rules={[{ required: true, message: 'Thiếu tên SP' }]}
                                        className="w-[250px]"
                                    >
                                        <Input placeholder="Tên Sản Phẩm" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'soLuong']}
                                        rules={[{ required: true, message: 'Thiếu SL' }]}
                                    >
                                        <InputNumber min={1} placeholder="SL" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'gia']}
                                        rules={[{ required: true, message: 'Thiếu giá' }]}
                                        className="w-[150px]"
                                    >
                                        <InputNumber
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                            placeholder="Giá"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} className="text-red-500" />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Thêm sản phẩm
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={onClose}>Hủy</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {initialValues ? "Cập Nhật" : "Tạo Mới"}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default OrderModal;