import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Tailwind cho centering và background */}
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
                extra={
                    <Link to="/">
                        <Button type="primary">Quay Về Trang Chủ</Button>
                    </Link>
                }
            />
        </div>
    );
};

export default NotFound;