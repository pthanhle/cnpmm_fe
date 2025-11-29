import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, Row, Col } from 'antd';
import dayjs from 'dayjs';

const EmployeeModal = ({ visible, onCancel, onSubmit, editingEmployee }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (editingEmployee) {
                form.setFieldsValue({
                    ...editingEmployee,
                    startDate: editingEmployee.startDate ? dayjs(editingEmployee.startDate) : null
                });
            } else {
                form.resetFields();
            }
        }
    }, [visible, editingEmployee, form]);

    return (
        <Modal
            title={editingEmployee ? 'Cập Nhật Nhân Viên' : 'Thêm Nhân Viên Mới'}
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            width={700} // Form nhiều trường nên để rộng hơn chút
            okText={editingEmployee ? "Lưu Thay Đổi" : "Thêm Mới"}
            cancelText="Hủy"
        >
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="employeeId" label="Mã Nhân Viên" rules={[{ required: true }]}>
                            <Input disabled={!!editingEmployee} placeholder="NV001" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="fullName" label="Họ Tên" rules={[{ required: true }]}>
                            <Input placeholder="Nguyễn Văn A" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="department" label="Phòng Ban" rules={[{ required: true }]}>
                            <Input placeholder="IT, HR, Sales..." />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="position" label="Vị Trí / Chức Vụ" rules={[{ required: true }]}>
                            <Input placeholder="Developer, Manager..." />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="salary" label="Mức Lương Cơ Bản" rules={[{ required: true }]}>
                            <InputNumber
                                min={0}
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="allowances" label="Phụ Cấp">
                            <InputNumber
                                min={0}
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="startDate" label="Ngày Bắt Đầu Làm Việc" rules={[{ required: true }]}>
                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EmployeeModal;