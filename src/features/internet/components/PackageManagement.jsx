import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { usePackages, usePackageActions } from '../hooks/useInternet';

const PackageManagement = () => {
    const { data: packages, isLoading } = usePackages();
    const { createPkg, updatePkg, deletePkg, isCreating, isUpdating, isDeleting } = usePackageActions();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPkg, setEditingPkg] = useState(null); // Nếu null => Create, có data => Edit
    const [form] = Form.useForm();

    // Mở modal (Create hoặc Edit)
    const handleOpenModal = (pkg = null) => {
        setEditingPkg(pkg);
        if (pkg) {
            form.setFieldsValue(pkg);
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    // Submit Form
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingPkg) {
                // Edit Mode
                await updatePkg({ id: editingPkg._id, data: values });
            } else {
                // Create Mode
                await createPkg(values);
            }
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.log('Validate Failed:', error);
        }
    };

    // Table Columns
    const columns = [
        {
            title: 'Tên Gói Cước',
            dataIndex: 'tenGoi',
            key: 'tenGoi',
            render: (text) => <span className="font-semibold text-sky-700">{text}</span>
        },
        {
            title: 'Tốc độ',
            dataIndex: 'tocDoMbps',
            key: 'tocDoMbps',
            render: (val) => <Tag color="blue" icon={<ThunderboltOutlined />}>{val} Mbps</Tag>,
            sorter: (a, b) => a.tocDoMbps - b.tocDoMbps,
        },
        {
            title: 'Giá cước (VNĐ)',
            dataIndex: 'giaThang',
            key: 'giaThang',
            render: (val) => <span className="font-mono text-gray-700">{val.toLocaleString()} đ</span>,
            sorter: (a, b) => a.giaThang - b.giaThang,
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            key: 'moTa',
            ellipsis: true,
            className: 'text-gray-500'
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <div className="flex gap-2">
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            icon={<EditOutlined />}
                            size="small"
                            className="text-sky-600 border-sky-200 hover:!text-sky-500 hover:!border-sky-400"
                            onClick={() => handleOpenModal(record)}
                        />
                    </Tooltip>

                    <Popconfirm
                        title="Xóa gói cước?"
                        description="Hành động này không thể hoàn tác."
                        onConfirm={() => deletePkg(record._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true, loading: isDeleting }}
                    >
                        <Tooltip title="Xóa gói">
                            <Button danger icon={<DeleteOutlined />} size="small" />
                        </Tooltip>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Quản lý Gói Cước Internet</h3>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleOpenModal(null)}
                    className="bg-sky-600 hover:!bg-sky-500 shadow-md shadow-sky-100"
                >
                    Thêm gói mới
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={packages}
                rowKey="_id"
                loading={isLoading}
                pagination={{ pageSize: 6 }}
                className="custom-table"
            />

            {/* Modal Form Create/Edit */}
            <Modal
                title={editingPkg ? "Cập nhật Gói Cước" : "Thêm Gói Cước Mới"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={isCreating || isUpdating}
                okText={editingPkg ? "Lưu thay đổi" : "Tạo gói"}
                cancelText="Hủy bỏ"
                centered
            >
                <Form form={form} layout="vertical" className="mt-4">
                    <Form.Item
                        name="tenGoi"
                        label="Tên gói cước"
                        rules={[{ required: true, message: 'Vui lòng nhập tên gói' }]}
                    >
                        <Input placeholder="Ví dụ: Super Net 2025" size="large" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="tocDoMbps"
                            label="Tốc độ (Mbps)"
                            rules={[{ required: true, message: 'Nhập tốc độ' }]}
                        >
                            <InputNumber min={1} className="w-full" size="large" addonAfter="Mbps" />
                        </Form.Item>

                        <Form.Item
                            name="giaThang"
                            label="Giá cước / tháng"
                            rules={[{ required: true, message: 'Nhập giá tiền' }]}
                        >
                            <InputNumber
                                min={0}
                                className="w-full"
                                size="large"
                                addonAfter="VNĐ"
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value?.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item name="moTa" label="Mô tả ưu đãi">
                        <Input.TextArea rows={3} placeholder="Mô tả chi tiết về gói cước..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default PackageManagement;