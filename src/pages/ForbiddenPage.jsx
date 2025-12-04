import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ForbiddenPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#141414]">
            <Result
                status="403"
                title={<span className="dark:text-white">403</span>}
                subTitle={<span className="dark:text-gray-400">Xin lỗi, bạn không có quyền truy cập trang này.</span>}
                extra={
                    <Button type="primary" onClick={() => navigate('/')}>
                        Về Trang Chủ
                    </Button>
                }
            />
        </div>
    );
};

export default ForbiddenPage;