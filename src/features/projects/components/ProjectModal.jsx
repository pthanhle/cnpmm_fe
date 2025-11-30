import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { PROJECT_STATUS, PROJECT_STATUS_LABEL } from '../../../shared/constants';

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
                form.setFieldsValue({ ...editingProject, members: membersString });
            } else {
                form.resetFields();
            }
        }
    }, [visible, editingProject, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            const membersArray = values.members
                ? values.members.split(',').map(m => m.trim()).filter(m => m !== '')
                : [];
            onSubmit({ ...values, members: membersArray });
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
                <Form.Item name="projectId" label="Mã Dự Án" rules={[{ required: true }]}>
                    <Input disabled={!!editingProject} placeholder="Ví dụ: PRJ001" />
                </Form.Item>
                <Form.Item name="name" label="Tên Dự Án" rules={[{ required: true }]}>
                    <Input placeholder="Nhập tên dự án" />
                </Form.Item>
                <Form.Item name="description" label="Mô Tả" rules={[{ required: true }]}>
                    <TextArea rows={3} />
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

                <Form.Item name="members" label="Thành Viên (Phân cách bằng dấu phẩy)">
                    <Input placeholder="Nguyễn Văn A, Trần Thị B" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProjectModal;