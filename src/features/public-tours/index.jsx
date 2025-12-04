import React from 'react';
import { Pagination, Spin, Typography, Empty } from 'antd';
import { usePublicTours } from './hooks/usePublicTours';
import PageHeaderAction from '@/components/molecules/PageHeaderAction';
import { TourCard, BookingModal } from './components';

const { Title } = Typography;

const PublicToursFeature = () => {
    const {
        tours, total, isLoading, page, setPage,
        searchTerm, handleSearch,
        isBookingModalVisible, selectedTour,
        openBookingModal, closeBookingModal,
        handleBookingSubmit, isBookingLoading
    } = usePublicTours();

    return (
        <div className="p-6 bg-gray-50 dark:bg-[#141414] min-h-screen transition-colors">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center pt-8">
                    <Title level={2} className="!text-blue-600 dark:!text-blue-400 !mb-2">
                        Khám Phá Thế Giới Cùng Travel App
                    </Title>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        Hàng trăm tour du lịch hấp dẫn đang chờ đón bạn
                    </p>
                </div>

                <div className="max-w-2xl mx-auto bg-white dark:bg-[#1f1f1f] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <PageHeaderAction
                        searchTerm={searchTerm}
                        setSearchTerm={(e) => handleSearch(e.target.value)}
                        onSearch={() => { }}
                        placeholder="Tìm kiếm địa điểm (VD: Phú Quốc, Đà Nẵng)..."
                        btnLabel=""
                        onAdd={null}
                    />
                </div>

                {isLoading ? (
                    <div className="h-64 flex justify-center items-center">
                        <Spin size="large" tip="Đang tìm kiếm tour..." />
                    </div>
                ) : (
                    <>
                        {tours.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {tours.map(tour => (
                                    <TourCard
                                        key={tour._id}
                                        tour={tour}
                                        onBook={openBookingModal}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20">
                                <Empty description={<span className="dark:text-gray-400">Không tìm thấy tour nào phù hợp</span>} />
                            </div>
                        )}

                        {total > 0 && (
                            <div className="flex justify-center mt-10 pb-10">
                                <Pagination
                                    current={page}
                                    total={total}
                                    pageSize={8}
                                    onChange={setPage}
                                    showSizeChanger={false}
                                />
                            </div>
                        )}
                    </>
                )}

                <BookingModal
                    visible={isBookingModalVisible}
                    onCancel={closeBookingModal}
                    onSubmit={handleBookingSubmit}
                    tour={selectedTour}
                    loading={isBookingLoading}
                />
            </div>
        </div>
    );
};

export default PublicToursFeature;