import React, { useState } from 'react';
import { Card, Typography, Spin } from 'antd';
import { useStudents } from './hooks/useStudents';
import PageHeaderAction from '../../components/molecules/PageHeaderAction';
import {
    StudentTable,
    StudentStats,
    StudentModal
} from './components';

const { Title } = Typography;

const StudentFeature = () => {
    const {
        students,
        loading,
        stats,
        isModalVisible,
        editingStudent,
        openModal,
        closeModal,
        handleDelete,
        handleFormSubmit,
        searchTerm,
        setSearchTerm
    } = useStudents();

    return (
        // [FIX UI 1]: Container chính phải ăn theo màu nền Dark Mode
        <div className="p-6 bg-gray-100 dark:bg-[#141414] min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="flex items-center justify-between mb-4">
                    {/* [FIX UI 2]: Tiêu đề cần đổi sang màu trắng khi Dark Mode */}
                    <Title level={2} className="!mb-0 !text-gray-800 dark:!text-white">
                        Quản Lý Sinh Viên
                    </Title>
                </div>

                <StudentStats stats={stats} />

                {/* [FIX UI 3]: Card của Antd sẽ tự động chuyển màu nhờ ConfigProvider */}
                <Card
                    className="shadow-sm border-gray-200 dark:border-gray-700"
                    bodyStyle={{ padding: '24px' }}
                >
                    <div className="mb-6">
                        <PageHeaderAction
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onSearch={() => handleSearch(searchTerm)}
                            onAdd={() => openModal(null)}
                            placeholder="Tìm kiếm theo tên hoặc mã SV..."
                            btnLabel="Thêm Sinh Viên"
                        />
                    </div>
                    {loading ? (
                        <div className="p-10 text-center"><Spin size="large" /></div>
                    ) : (
                        <StudentTable
                            students={students}
                            loading={loading}
                            onEdit={openModal}
                            onDelete={handleDelete}
                        />
                    )}
                </Card>

                <StudentModal
                    visible={isModalVisible}
                    onCancel={closeModal}
                    onSubmit={handleFormSubmit}
                    editingStudent={editingStudent}
                />
            </div>
        </div>
    );
};

export default StudentFeature;