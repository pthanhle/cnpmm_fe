import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';

const EmployeeModal = ({ open, onClose, onSubmit, initialValues, loading }) => {
    const [form] = Form.useForm();

    // Reset hoặc set giá trị khi mở modal
    useEffect(() => {
        if (open) {
            if (initialValues) {
                form.setFieldsValue({
                    ...initialValues,
                    ngayVaoLam: initialValues.ngayVaoLam ? dayjs(initialValues.ngayVaoLam) : dayjs(),
                });
            } else {
                form.resetFields();
                form.setFieldsValue({ ngayVaoLam: dayjs() });
            }
        }
    }, [open, initialValues, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
        } catch (error) {
            console.log('Validate Failed:', error);
        }
    };

    return (
        <Modal
            title={initialValues ? "Sửa nhân viên" : "Thêm nhân viên"}
            open={open}
            onOk={handleOk}
            onCancel={onClose}
            confirmLoading={loading}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical" name="employee_form">
                <Form.Item
                    name="maNV"
                    label="Mã NV"
                    rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên!' }]}
                >
                    <Input disabled={!!initialValues} placeholder="NV001" />
                </Form.Item>

                <Form.Item
                    name="hoTen"
                    label="Họ tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                    <Input placeholder="Nguyễn Văn A" />
                </Form.Item>

                <Form.Item
                    name="chucVu"
                    label="Chức vụ"
                    rules={[{ required: true, message: 'Vui lòng nhập chức vụ!' }]}
                >
                    <Select placeholder="Chọn chức vụ">
                        <Select.Option value="Lập trình viên">Lập trình viên</Select.Option>
                        <Select.Option value="Kế toán">Kế toán</Select.Option>
                        <Select.Option value="Nhân sự">Nhân sự</Select.Option>
                        <Select.Option value="Trưởng phòng">Trưởng phòng</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="luong"
                    label="Lương"
                    rules={[{ required: true, message: 'Vui lòng nhập lương!' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                        addonAfter="VND"
                    />
                </Form.Item>

                <Form.Item
                    name="ngayVaoLam"
                    label="Ngày vào làm"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                >
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EmployeeModal;