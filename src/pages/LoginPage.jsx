import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Navigate } from 'react-router-dom';
import { loginAPI } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';

const { Title } = Typography;

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    if (isAuthenticated) return <Navigate to="/" replace />;

    const loginMutation = useMutation({
        mutationFn: loginAPI,
        onSuccess: (response) => {
            if (response.status === 'success') {
                message.success('Đăng nhập thành công!');
                login(response.token, response.data);
                navigate('/');
            }
        },
        onError: (error) => {
            message.error(error.response?.data?.message || 'Đăng nhập thất bại');
        }
    });

    const onFinish = (values) => {
        loginMutation.mutate(values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#141414] transition-colors p-4">
            <Card className="w-full max-w-md shadow-lg dark:bg-[#1f1f1f] dark:border-gray-700">
                <div className="text-center mb-6">
                    <Title level={3} className="!text-blue-600 dark:!text-blue-400 !mb-2">
                        Travel App
                    </Title>
                    <p className="text-gray-500 dark:text-gray-400">Đăng nhập để quản lý hệ thống</p>
                </div>

                <Form
                    name="login_form"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập Email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email (admin@travel.com)" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loginMutation.isPending}
                            className="h-10 font-semibold"
                        >
                            Đăng Nhập
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center mt-4 border-t pt-4 dark:border-gray-700">
                    <Button
                        type="link"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/')}
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                        Quay về trang chủ
                    </Button>
                </div>

            </Card>
        </div>
    );
};

export default LoginPage;