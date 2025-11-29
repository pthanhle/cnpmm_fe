import React from 'react';
import { Input, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const StudentFilter = ({ searchTerm, setSearchTerm, onSearch, onOpenModal }) => {
    return (
        <div className="flex flex-wrap justify-between items-center gap-4">
            {/* Thanh tìm kiếm */}
            <div className="w-full md:w-1/3">
                <Input
                    placeholder="Tìm kiếm theo tên hoặc mã SV..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onPressEnter={onSearch}
                    prefix={<SearchOutlined className="text-gray-400" />}
                    allowClear
                    size="large"
                />
            </div>

            {/* Nút thêm mới */}
            <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={onOpenModal}
                className="shadow-md"
            >
                Thêm Sinh Viên
            </Button>
        </div>
    );
};

export default StudentFilter;