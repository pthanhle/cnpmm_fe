import React from 'react';
import { Input, Button, Select } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProjectFilter = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onSearch, onReport, onOpenModal }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-3/4">
                {/* Search Input */}
                <Input
                    placeholder="Tìm theo tên hoặc mã dự án..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onPressEnter={onSearch}
                    prefix={<SearchOutlined className="text-gray-400" />}
                    style={{ width: 250 }}
                />

                {/* Status Select */}
                <Select
                    placeholder="Chọn trạng thái"
                    value={statusFilter || undefined} // undefined để hiện placeholder nếu rỗng
                    onChange={setStatusFilter}
                    style={{ width: 180 }}
                    allowClear
                >
                    <Option value="ongoing">Đang thực hiện</Option>
                    <Option value="completed">Hoàn thành</Option>
                    <Option value="canceled">Hủy bỏ</Option>
                </Select>

                {/* Filter Button */}
                <Button type="default" icon={<FilterOutlined />} onClick={onReport}>
                    Lọc Dự Án
                </Button>
            </div>

            {/* Add Button */}
            <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={onOpenModal}
                className="shadow-md ml-auto"
            >
                Thêm Dự Án
            </Button>
        </div>
    );
};

export default ProjectFilter;