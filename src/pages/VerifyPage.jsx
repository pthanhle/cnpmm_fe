import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Result, Button, Card, Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { verifyBooking } from '@/api/bookings';

const { Title, Paragraph } = Typography;

const VerifyPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    // 'idle': Chưa bấm nút | 'loading': Đang gọi API | 'success': OK | 'error': Lỗi
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const handleVerifyClick = async () => {
        if (!token) return;

        setStatus('loading');
        try {
            await verifyBooking(token);
            setStatus('success');
            setMessage('Giữ chỗ thành công! Vui lòng hoàn tất thanh toán.');
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.message || 'Link xác nhận không hợp lệ hoặc đã hết hạn.');
        }
    };

    // Giao diện chờ người dùng bấm nút (Chống Bot scan)
    if (status === 'idle') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#141414] p-4">
                <Card className="w-full max-w-md shadow-xl dark:bg-[#1f1f1f] dark:border-gray-700 text-center py-10">
                    <div className="mb-6">
                        <SafetyCertificateOutlined className="text-6xl text-blue-500" />
                    </div>
                    <Title level={3} className="dark:!text-white">Xác Thực Đặt Chỗ</Title>
                    <Paragraph className="text-gray-500 dark:text-gray-400 mb-8">
                        Để bảo mật, vui lòng nhấn nút bên dưới để hoàn tất quá trình giữ chỗ của bạn.
                    </Paragraph>

                    <Button
                        type="primary"
                        size="large"
                        shape="round"
                        onClick={handleVerifyClick}
                        className="h-12 px-8 font-bold text-lg bg-blue-600 hover:bg-blue-500 border-none"
                    >
                        Xác Nhận Ngay
                    </Button>
                </Card>
            </div>
        );
    }

    // Giao diện đang xử lý
    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#141414]">
                <Card className="p-10 shadow-lg dark:bg-[#1f1f1f]">
                    <Result status="info" title="Đang xác thực..." subTitle="Vui lòng đợi trong giây lát" />
                </Card>
            </div>
        );
    }

    // Giao diện Kết quả (Thành công / Thất bại)
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#141414] p-4">
            <Card className="w-full max-w-lg shadow-lg dark:bg-[#1f1f1f] dark:border-gray-700">
                <Result
                    status={status}
                    icon={status === 'success' ? <CheckCircleOutlined className="text-green-500" /> : <CloseCircleOutlined className="text-red-500" />}
                    title={
                        <span className={status === 'success' ? "text-green-600" : "text-red-600"}>
                            {status === 'success' ? 'Thành Công!' : 'Xác Thực Thất Bại'}
                        </span>
                    }
                    subTitle={
                        <span className="text-gray-600 dark:text-gray-400 text-base font-medium">
                            {message}
                        </span>
                    }
                    extra={[
                        <Button
                            type="primary"
                            key="home"
                            size="large"
                            onClick={() => navigate('/')}
                            className={status === 'success' ? "bg-green-600" : ""}
                        >
                            Về Trang Chủ
                        </Button>,
                    ]}
                />
            </Card>
        </div>
    );
};

export default VerifyPage;