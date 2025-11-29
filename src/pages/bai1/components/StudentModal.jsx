import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker } from 'antd';
import dayjs from 'dayjs';

const StudentModal = ({ visible, onCancel, onSubmit, editingStudent }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (editingStudent) {
                // Convert string date sang dayjs object để DatePicker hiển thị được
                form.setFieldsValue({
                    ...editingStudent,
                    birthDate: editingStudent.birthDate ? dayjs(editingStudent.birthDate) : null
                });
            } else {
                form.resetFields();
            }
        }
    }, [visible, editingStudent, form]);

    return (
        <Modal
            title={editingStudent ? 'Cập Nhật Thông Tin' : 'Thêm Sinh Viên Mới'}
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText={editingStudent ? "Lưu Thay Đổi" : "Thêm Mới"}
            cancelText="Hủy"
        >
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item name="studentId" label="Mã Sinh Viên" rules={[{ required: true }]}>
                    <Input disabled={!!editingStudent} placeholder="Ví dụ: SV001" />
                </Form.Item>

                <Form.Item name="fullName" label="Họ và Tên" rules={[{ required: true }]}>
                    <Input placeholder="Nhập họ tên đầy đủ" />
                </Form.Item>

                <Form.Item name="birthDate" label="Ngày Sinh" rules={[{ required: true }]}>
                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="gpa" label="Điểm TB (GPA)" rules={[{ required: true }]}>
                        <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="major" label="Chuyên Ngành" rules={[{ required: true }]}>
                        <Input placeholder="CNTT, Kinh tế..." />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default StudentModal;