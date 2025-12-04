import React from 'react';
import { Card, Typography, Spin } from 'antd';
import { useAdminTours } from './hooks/useAdminTours';
import PageHeaderAction from '@/components/molecules/PageHeaderAction';
import { TourTable, TourModal } from './components';

const { Title } = Typography;

const AdminToursFeature = () => {
    const {
        tours, pagination, isLoading,
        searchTerm, handleSearch,
        isModalVisible, editingTour,
        openModal, closeModal,
        handleFormSubmit, handleDelete
    } = useAdminTours();

    return (
        <div className="p-6 bg-gray-50 dark:bg-[#141414] min-h-screen transition-colors">
            <div className="max-w-7xl mx-auto space-y-6">
                <Title level={2} className="!mb-0 !text-gray-800 dark:!text-white">Quản Lý Tour</Title>

                <Card className="shadow-sm dark:bg-[#1f1f1f] dark:border-gray-700" bodyStyle={{ padding: '24px' }}>
                    <div className="mb-6">
                        <PageHeaderAction
                            searchTerm={searchTerm}
                            setSearchTerm={(e) => handleSearch(e.target.value)}
                            onSearch={() => { }}
                            onAdd={() => openModal(null)}
                            placeholder="Tìm kiếm tour theo tên..."
                            btnLabel="Thêm Tour"
                        />
                    </div>

                    {isLoading && !tours.length ? (
                        <div className="p-10 text-center"><Spin size="large" /></div>
                    ) : (
                        <TourTable
                            tours={tours}
                            loading={isLoading}
                            onEdit={openModal}
                            onDelete={handleDelete}
                            pagination={pagination}
                        />
                    )}
                </Card>

                <TourModal
                    visible={isModalVisible}
                    onCancel={closeModal}
                    onSubmit={handleFormSubmit}
                    editingTour={editingTour}
                />
            </div>
        </div>
    );
};

export default AdminToursFeature;