import React from 'react';
import { Card, Slider, Select, Button, Typography, Form, InputNumber } from 'antd';
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const TourFilter = ({ onFilter, onReset }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onFilter(values);
    };

    const handleReset = () => {
        form.resetFields();
        onReset();
    };

    return (
        <Card className="dark:bg-[#1f1f1f] dark:border-gray-700 shadow-sm h-full">
            <div className="flex items-center justify-between mb-4">
                <Title level={5} className="!m-0 !text-blue-600 dark:!text-blue-400">
                    <FilterOutlined className="mr-2" /> Bộ Lọc Tìm Kiếm
                </Title>
                <Button type="text" size="small" icon={<ReloadOutlined />} onClick={handleReset} className="text-gray-500">
                    Đặt lại
                </Button>
            </div>

            <Form form={form} layout="vertical" onFinish={handleFinish}>
                {/* Lọc theo mức giá */}
                <Form.Item label={<span className="dark:text-gray-300">Khoảng giá (VNĐ)</span>} className="mb-4">
                    <div className="flex gap-2 mb-2">
                        <Form.Item name="minPrice" noStyle>
                            <InputNumber placeholder="Từ" style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                        </Form.Item>
                        <span className="dark:text-gray-400">-</span>
                        <Form.Item name="maxPrice" noStyle>
                            <InputNumber placeholder="Đến" style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                        </Form.Item>
                    </div>
                </Form.Item>

                {/* Lọc theo số ngày */}
                <Form.Item name="duration" label={<span className="dark:text-gray-300">Thời lượng</span>}>
                    <Select placeholder="Chọn số ngày" allowClear>
                        <Option value="1">Trong ngày</Option>
                        <Option value="2">2 ngày 1 đêm</Option>
                        <Option value="3">3 ngày 2 đêm</Option>
                        <Option value="4">4 ngày 3 đêm</Option>
                        <Option value="5">5 ngày trở lên</Option>
                    </Select>
                </Form.Item>

                {/* Lọc theo địa điểm (Bổ sung cho ô Search chính) */}
                <Form.Item name="location" label={<span className="dark:text-gray-300">Địa điểm cụ thể</span>}>
                    <Select showSearch placeholder="Chọn điểm đến" allowClear>
                        <Option value="Phú Quốc">Phú Quốc</Option>
                        <Option value="Đà Nẵng">Đà Nẵng</Option>
                        <Option value="Hà Nội">Hà Nội</Option>
                        <Option value="Sa Pa">Sa Pa</Option>
                        <Option value="Hạ Long">Hạ Long</Option>
                        <Option value="Đà Lạt">Đà Lạt</Option>
                        <Option value="Nha Trang">Nha Trang</Option>
                    </Select>
                </Form.Item>

                <Button type="primary" htmlType="submit" block className="mt-2 font-semibold">
                    Áp Dụng Bộ Lọc
                </Button>
            </Form>
        </Card>
    );
};

export default TourFilter;