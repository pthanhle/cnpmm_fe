import React, { useState } from 'react';
import { Card, Button, Input, Slider, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useDebounce } from '@/hooks/useDebounce';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';
import { useEmployees, useEmployeeMutation } from './hooks/useEmployees';

const EmployeeFeature = () => {
    // 1. State Management
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [salaryRange, setSalaryRange] = useState([0, 50000000]); // 0 - 50tr

    // 2. Debounce Logic (Tránh spam API)
    const debouncedKeyword = useDebounce(keyword, 500);
    const debouncedSalary = useDebounce(salaryRange, 500);

    // 3. Modal & Action State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    // 4. API Hooks
    const { data, isLoading } = useEmployees({
        page,
        limit: pageSize,
        keyword: debouncedKeyword,
        minSalary: debouncedSalary[0],
        maxSalary: debouncedSalary[1],
    });

    const { create, update, remove } = useEmployeeMutation();

    // 5. Handlers
    const handleTableChange = (pagination) => {
        setPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const handleSubmit = (values) => {
        if (editingEmployee) {
            update.mutate({ id: editingEmployee._id, data: values }, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingEmployee(null);
                }
            });
        } else {
            create.mutate(values, {
                onSuccess: () => setIsModalOpen(false)
            });
        }
    };

    const handleOpenEdit = (record) => {
        setEditingEmployee(record);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        remove.mutate(id);
    };

    const handleOpenCreate = () => {
        setEditingEmployee(null);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <Card
                title="Quản lý Nhân Viên"
                className="shadow-lg dark:bg-[#141414] dark:border-gray-700"
                extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreate}>
                        Thêm mới
                    </Button>
                }
            >
                {/* --- Filter Section --- */}
                <Row gutter={[16, 16]} className="mb-6">
                    <Col xs={24} md={12} lg={8}>
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Tìm theo tên hoặc chức vụ..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            allowClear
                        />
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <div className="flex items-center gap-2">
                            <span className="whitespace-nowrap dark:text-gray-300">Lương:</span>
                            <Slider
                                range
                                min={0}
                                max={100000000} // Max 100tr
                                step={1000000}
                                value={salaryRange}
                                onChange={setSalaryRange}
                                className="w-full"
                                tooltip={{ formatter: value => `${(value / 1000000).toFixed(0)}tr` }}
                            />
                        </div>
                    </Col>
                </Row>

                {/* --- Table Section --- */}
                <EmployeeTable
                    data={data?.data}
                    pagination={{
                        current: data?.meta?.current || 1,
                        pageSize: data?.meta?.pageSize || 10,
                        total: data?.meta?.total || 0,
                    }}
                    isLoading={isLoading}
                    onChange={handleTableChange}
                    onEdit={handleOpenEdit}
                    onDelete={handleDelete}
                />
            </Card>

            {/* --- Modal Section --- */}
            <EmployeeModal
                open={isModalOpen}
                initialValues={editingEmployee}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                loading={create.isPending || update.isPending}
            />
        </div>
    );
};

export default EmployeeFeature;