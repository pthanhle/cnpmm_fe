import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { PROJECT_STATUS, PROJECT_STATUS_LABEL } from '@/constants';

const { Option } = Select;
const { TextArea } = Input;

const ProjectModal = ({ visible, onCancel, onSubmit, editingProject }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (editingProject) {
                const membersString = Array.isArray(editingProject.members)
                    ? editingProject.members.join(', ')
                    : '';

                form.setFieldsValue({
                    ...editingProject,
                    members: membersString
                });
            } else {
                form.resetFields();
                form.setFieldsValue({ status: PROJECT_STATUS.ONGOING });
            }
        }
    }, [visible, editingProject, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            const membersArray = values.members
                ? values.members.split(',').map(m => m.trim()).filter(m => m !== '')
                : [];

            const submitData = {
                ...values,
                members: membersArray
            };

            onSubmit(submitData);
        });
    };

    return (
        <Modal
            title={editingProject ? 'Cập Nhật Dự Án' : 'Khởi Tạo Dự Án Mới'}
            open={visible}
            onCancel={onCancel}
            onOk={handleOk}
            okText={editingProject ? "Lưu" : "Tạo"}
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item name="projectId" label="Mã Dự Án" rules={[{ required: true, message: 'Vui lòng nhập mã dự án' }]}>
                    <Input disabled={!!editingProject} placeholder="PRJ001" />
                </Form.Item>

                <Form.Item name="name" label="Tên Dự Án" rules={[{ required: true, message: 'Vui lòng nhập tên dự án' }]}>
                    <Input placeholder="Quản lý kho..." />
                </Form.Item>

                <Form.Item name="description" label="Mô Tả">
                    <TextArea rows={3} placeholder="Mô tả chi tiết..." />
                </Form.Item>

                <Form.Item name="status" label="Trạng Thái" rules={[{ required: true }]}>
                    <Select placeholder="Chọn trạng thái">
                        {Object.values(PROJECT_STATUS).map(status => (
                            <Option key={status} value={status}>
                                {PROJECT_STATUS_LABEL[status]}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="members"
                    label="Thành Viên (Phân cách bằng dấu phẩy)"
                    help="Ví dụ: Nguyễn Văn A, Trần Thị B"
                >
                    <Input placeholder="Nhập tên thành viên..." />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProjectModal;