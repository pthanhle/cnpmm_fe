import React from 'react';
import { Pagination, Spin, Typography, Empty, Row, Col, Button, Drawer } from 'antd';
import { usePublicTours } from './hooks/usePublicTours';
import PageHeaderAction from '@/components/molecules/PageHeaderAction';
import { TourCard, BookingModal, TourFilter } from './components';
import { FilterOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PublicToursFeature = () => {
    const {
        tours, total, isLoading, page, setPage,
        searchTerm, handleSearch,
        handleFilter, handleResetFilter,
        isBookingModalVisible, selectedTour,
        openBookingModal, closeBookingModal,
        handleBookingSubmit, isBookingLoading
    } = usePublicTours();

    const [drawerVisible, setDrawerVisible] = React.useState(false);

    return (
        <div className="p-6 bg-gray-50 dark:bg-[#141414] min-h-screen transition-colors">
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="text-center py-6">
                    <Title level={2} className="!text-blue-600 dark:!text-blue-400 !mb-2">
                        Khám Phá Thế Giới
                    </Title>
                    <p className="text-gray-500 dark:text-gray-400">
                        Tìm kiếm chuyến đi mơ ước của bạn
                    </p>
                </div>

                <div className="lg:hidden mb-4">
                    <Button icon={<FilterOutlined />} onClick={() => setDrawerVisible(true)} block>
                        Mở Bộ Lọc
                    </Button>
                </div>

                <Row gutter={24}>
                    <Col xs={0} lg={6} className="hidden lg:block">
                        <TourFilter onFilter={handleFilter} onReset={handleResetFilter} />
                    </Col>

                    <Col xs={24} lg={18}>
                        <div className="mb-6 bg-white dark:bg-[#1f1f1f] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <PageHeaderAction
                                searchTerm={searchTerm}
                                setSearchTerm={(e) => handleSearch(e.target.value)}
                                onSearch={() => { }}
                                placeholder="Tìm tên tour..."
                                btnLabel="" onAdd={null}
                            />
                        </div>

                        {isLoading ? (
                            <div className="h-64 flex justify-center items-center"><Spin size="large" /></div>
                        ) : (
                            <>
                                {tours.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {tours.map(tour => (
                                            <TourCard key={tour._id} tour={tour} onBook={openBookingModal} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20"><Empty description="Không tìm thấy tour nào phù hợp" /></div>
                                )}

                                {total > 0 && (
                                    <div className="flex justify-center mt-10">
                                        <Pagination current={page} total={total} pageSize={8} onChange={setPage} showSizeChanger={false} className="dark:text-white" />
                                    </div>
                                )}
                            </>
                        )}
                    </Col>
                </Row>

                {/* Drawer Filter (Mobile) */}
                <Drawer
                    title="Bộ Lọc Tìm Kiếm"
                    placement="left"
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    width={300}
                >
                    <TourFilter onFilter={handleFilter} onReset={handleResetFilter} />
                </Drawer>

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