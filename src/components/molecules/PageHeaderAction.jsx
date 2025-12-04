import React from 'react';
import { Input, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const PageHeaderAction = ({
    searchTerm, setSearchTerm, onSearch,
    onAdd,
    placeholder = "Tìm kiếm...",
    btnLabel = "Thêm Mới",
    children
}) => {
    return (
        <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-3/4">
                <Input
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={setSearchTerm}
                    prefix={<SearchOutlined className="text-gray-400" />}
                    allowClear
                    size="large"
                    style={{ maxWidth: 300 }}
                />
                {children}
            </div>

            {onAdd && (
                <Button
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={onAdd}
                    className="shadow-md ml-auto"
                >
                    {btnLabel}
                </Button>
            )}
        </div>
    );
};

export default PageHeaderAction;