import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const ProjectModal = ({ visible, onCancel, onSubmit, editingProject }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (editingProject) {
                // Logic quan trọng: Chuyển mảng ['A', 'B'] thành chuỗi "A, B" để hiển thị trong Input
                const membersString = Array.isArray(editingProject.members)
                    ? editingProject.members.join(', ')
                    : '';

                form.setFieldsValue({
                    ...editingProject,
                    members: membersString
                });
            } else {
                form.resetFields();
            }
        }
    }, [visible, editingProject, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            // Logic quan trọng: Chuyển chuỗi "A, B" thành mảng ['A', 'B'] để gửi về Backend
            const membersArray = values.members
                ? values.members.split(',').map(m => m.trim()).filter(m => m !== '')
                : [];

            const submitData = {
                ...values,
                members: membersArray
            };

            onSubmit(submitData);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    return (
        <Modal
            title={editingProject ? 'Cập Nhật Dự Án' : 'Khởi Tạo Dự Án Mới'}
            open={visible}
            onCancel={onCancel}
            onOk={handleOk}
            okText={editingProject ? "Lưu Thay Đổi" : "Tạo Mới"}
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item name="projectId" label="Mã Dự Án" rules={[{ required: true, message: 'Vui lòng nhập mã dự án!' }]}>
                    <Input disabled={!!editingProject} placeholder="Ví dụ: PRJ001" />
                </Form.Item>

                <Form.Item name="name" label="Tên Dự Án" rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}>
                    <Input placeholder="Nhập tên dự án" />
                </Form.Item>

                <Form.Item name="description" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                    <TextArea rows={3} placeholder="Mô tả chi tiết về dự án..." />
                </Form.Item>

                <Form.Item name="status" label="Trạng Thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                    <Select placeholder="Chọn trạng thái hiện tại">
                        <Option value="ongoing">Đang thực hiện</Option>
                        <Option value="completed">Hoàn thành</Option>
                        <Option value="canceled">Hủy bỏ</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="members"
                    label="Thành Viên (Phân cách bằng dấu phẩy)"
                    help="Ví dụ: Nguyễn Văn A, Trần Thị B"
                >
                    <Input placeholder="Nhập tên các thành viên..." />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProjectModal;