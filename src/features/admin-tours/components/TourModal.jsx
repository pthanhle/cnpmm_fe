import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { TOUR_STATUS, TOUR_STATUS_LABEL } from '@/constants';

const { TextArea } = Input;
const { Option } = Select;

const TourModal = ({ visible, onCancel, onSubmit, editingTour }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if (editingTour) {
                form.setFieldsValue({
                    ...editingTour,
                    departureDate: editingTour.departureDate ? dayjs(editingTour.departureDate) : null
                });
            } else {
                form.resetFields();
                form.setFieldsValue({ status: TOUR_STATUS.ACTIVE });
            }
        }
    }, [visible, editingTour, form]);

    return (
        <Modal
            title={editingTour ? 'Cập Nhật Tour' : 'Thêm Tour Mới'}
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText="Lưu"
            cancelText="Hủy"
            width={700}
            centered
        >
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <Form.Item name="name" label="Tên Tour" rules={[{ required: true, message: 'Vui lòng nhập tên tour' }]}>
                    <Input placeholder="VD: Khám phá Đà Nẵng 3N2Đ" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="location" label="Địa Điểm" rules={[{ required: true, message: 'Nhập địa điểm' }]}>
                        <Input placeholder="VD: Đà Nẵng" />
                    </Form.Item>
                    <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true, message: 'Nhập giá tiền' }]}>
                        <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="maxCapacity" label="Số Khách Tối Đa" rules={[{ required: true, message: 'Nhập số lượng' }]}>
                        <InputNumber style={{ width: '100%' }} min={1} />
                    </Form.Item>
                    <Form.Item name="duration" label="Thời Lượng (Ngày)" rules={[{ required: true, message: 'Nhập thời lượng' }]}>
                        <InputNumber style={{ width: '100%' }} min={1} />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="departureDate" label="Ngày Khởi Hành" rules={[{ required: true, message: 'Chọn ngày' }]}>
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item name="status" label="Trạng Thái">
                        <Select>
                            {Object.values(TOUR_STATUS).map(status => (
                                <Option key={status} value={status}>{TOUR_STATUS_LABEL[status]}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item name="image" label="Link Ảnh (URL)" rules={[{ required: true, type: 'url', message: 'Nhập link ảnh hợp lệ' }]}>
                    <Input placeholder="https://example.com/image.jpg" />
                </Form.Item>

                <Form.Item name="description" label="Mô Tả Chi Tiết">
                    <TextArea rows={4} placeholder="Nhập mô tả về tour..." />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TourModal;