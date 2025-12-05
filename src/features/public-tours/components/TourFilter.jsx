import React from 'react';
import { Card, Select, Button, Typography, Form, InputNumber, Divider } from 'antd';
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
        <Card className="dark:bg-[#1f1f1f] dark:border-gray-700 shadow-sm border-gray-100 sticky top-24">

            <div className="flex items-center justify-between mb-4">
                <Title level={5} className="!m-0 !text-blue-600 dark:!text-blue-400 flex items-center">
                    <FilterOutlined className="mr-2" /> Bộ Lọc
                </Title>
                <Button
                    type="text"
                    size="small"
                    icon={<ReloadOutlined />}
                    onClick={handleReset}
                    className="text-gray-500 hover:text-blue-600 dark:text-gray-400"
                >
                    Đặt lại
                </Button>
            </div>

            <Divider className="my-3 dark:border-gray-700" />

            <Form form={form} layout="vertical" onFinish={handleFinish} className="space-y-2">

                <Form.Item name="location" label={<span className="dark:text-gray-300 font-medium">Địa điểm</span>} className="mb-3">
                    <Select
                        showSearch
                        placeholder="Chọn nơi đến"
                        allowClear
                        className="w-full"
                        options={[
                            { value: 'Phú Quốc', label: 'Phú Quốc' },
                            { value: 'Đà Nẵng', label: 'Đà Nẵng' },
                            { value: 'Hà Nội', label: 'Hà Nội' },
                            { value: 'Sa Pa', label: 'Sa Pa' },
                            { value: 'Hạ Long', label: 'Hạ Long' },
                            { value: 'Đà Lạt', label: 'Đà Lạt' },
                            { value: 'Nha Trang', label: 'Nha Trang' },
                            { value: 'Huế', label: 'Huế' },
                            { value: 'Hội An', label: 'Hội An' },
                        ]}
                    />
                </Form.Item>

                <Form.Item label={<span className="dark:text-gray-300 font-medium">Khoảng giá (VNĐ)</span>} className="mb-3">
                    <div className="flex items-center gap-2">
                        <Form.Item name="minPrice" noStyle>
                            <InputNumber
                                placeholder="Tối thiểu"
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                controls={false}
                            />
                        </Form.Item>
                        <span className="dark:text-gray-400 font-bold">-</span>
                        <Form.Item name="maxPrice" noStyle>
                            <InputNumber
                                placeholder="Tối đa"
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                controls={false}
                            />
                        </Form.Item>
                    </div>
                </Form.Item>

                <Form.Item name="duration" label={<span className="dark:text-gray-300 font-medium">Thời lượng</span>} className="mb-6">
                    <Select placeholder="Chọn thời gian" allowClear>
                        <Option value="1">Trong ngày</Option>
                        <Option value="2">2 ngày 1 đêm</Option>
                        <Option value="3">3 ngày 2 đêm</Option>
                        <Option value="4">4 ngày 3 đêm</Option>
                        <Option value="5">5 ngày trở lên</Option>
                    </Select>
                </Form.Item>

                <Button type="primary" htmlType="submit" block size="large" className="font-semibold shadow-sm">
                    Áp Dụng
                </Button>
            </Form>
        </Card>
    );
};

export default TourFilter;