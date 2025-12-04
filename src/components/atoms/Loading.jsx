import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-full w-full min-h-[50vh]">
            <Spin size="large" tip="Đang tải dữ liệu..." />
        </div>
    );
};

export default Loading;