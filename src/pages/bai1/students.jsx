import React, { useState, useEffect } from 'react';
import { message, Card, Typography, Spin } from 'antd';
import { getStudents, createStudent, updateStudent, deleteStudent, searchStudents, getStudentStats } from '../../services/api';

// Import components con
import StudentFilter from './components/StudentFilter';
import StudentTable from './components/StudentTable';
import StudentStats from './components/StudentStats';
import StudentModal from './components/StudentModal';

const { Title } = Typography;

const Students = () => {
    // --- State ---
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Stats
    const [stats, setStats] = useState({ max: null, min: null });

    // Filter
    const [searchTerm, setSearchTerm] = useState('');

    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    // --- Effect ---
    useEffect(() => {
        fetchStudents();
        fetchStats();
    }, []);

    // --- API Handlers ---
    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await getStudents();
            setStudents(Array.isArray(response) ? response : []);
        } catch (error) {
            setStudents([]);
            message.error('Lỗi tải danh sách: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await getStudentStats();
            setStats(response);
        } catch (error) {
            console.error('Lỗi tải thống kê:', error);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            if (!searchTerm.trim()) {
                await fetchStudents();
                return;
            }
            const response = await searchStudents(searchTerm);
            setStudents(Array.isArray(response) ? response : []);
        } catch (error) {
            setStudents([]);
            message.error('Lỗi tìm kiếm: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteStudent(id);
            message.success('Xóa thành công');
            fetchStudents();
            fetchStats(); // Update stats after delete
        } catch (error) {
            message.error('Lỗi xóa: ' + error.message);
        }
    };

    const handleFormSubmit = async (values) => {
        try {
            if (editingStudent) {
                await updateStudent(editingStudent._id, values);
                message.success('Cập nhật thành công');
            } else {
                await createStudent(values);
                message.success('Thêm thành công');
            }
            setIsModalVisible(false);
            fetchStudents();
            fetchStats(); // Update stats after add/update
        } catch (error) {
            message.error('Lỗi: ' + error.message);
        }
    };

    const openModal = (record = null) => {
        setEditingStudent(record);
        setIsModalVisible(true);
    };

    // --- Render ---
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <Title level={2} style={{ margin: 0, color: '#1f2937' }}>Quản Lý Sinh Viên</Title>
                </div>

                {/* Phần Thống Kê */}
                <StudentStats stats={stats} />

                {/* Phần Filter & Table */}
                <Card className="shadow-sm" bodyStyle={{ padding: '24px' }}>
                    <div className="mb-6">
                        <StudentFilter
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onSearch={handleSearch}
                            onOpenModal={() => openModal(null)}
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

                {/* Modal */}
                <StudentModal
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    onSubmit={handleFormSubmit}
                    editingStudent={editingStudent}
                />
            </div>
        </div>
    );
};

export default Students;