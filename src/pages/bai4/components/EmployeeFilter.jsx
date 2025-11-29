import React from 'react';
import { Input, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const EmployeeFilter = ({ searchTerm, setSearchTerm, onSearch, onOpenModal }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search Input */}
            <div className="w-full md:w-1/3">
                <Input
                    placeholder="Tìm kiếm theo tên hoặc mã NV..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onPressEnter={onSearch}
                    prefix={<SearchOutlined className="text-gray-400" />}
                    allowClear
                    size="large"
                />
            </div>

            {/* Add Button */}
            <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={onOpenModal}
                className="shadow-md"
            >
                Thêm Nhân Viên
            </Button>
        </div>
    );
};

export default EmployeeFilter;