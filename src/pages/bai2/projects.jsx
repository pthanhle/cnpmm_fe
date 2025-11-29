import React, { useState, useEffect } from 'react';
import { message, Card, Typography, Spin } from 'antd';
import { getProjects, createProject, updateProject, deleteProject, searchProjects, getProjectsByStatus, getProjectMemberStats } from '../../services/api';

// Import Components
import ProjectFilter from './components/ProjectFilter';
import ProjectTable from './components/ProjectTable';
import ProjectStats from './components/ProjectStats';
import ProjectModal from './components/ProjectModal';

const { Title } = Typography;

const Projects = () => {
    // --- State ---
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    // Stats
    const [memberStats, setMemberStats] = useState([]);

    // Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // --- Effects ---
    useEffect(() => {
        fetchProjects();
        fetchMemberStats();
    }, []);

    // --- API Handlers ---
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await getProjects();
            setProjects(Array.isArray(response) ? response : []);
        } catch (error) {
            setProjects([]);
            message.error('Lỗi tải danh sách: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchMemberStats = async () => {
        try {
            const response = await getProjectMemberStats();
            setMemberStats(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error('Lỗi tải thống kê:', error);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            if (!searchTerm.trim()) {
                await fetchProjects();
                return;
            }
            const response = await searchProjects(searchTerm);
            setProjects(Array.isArray(response) ? response : []);
        } catch (error) {
            message.error('Lỗi tìm kiếm: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReport = async () => {
        setLoading(true);
        try {
            if (!statusFilter) {
                await fetchProjects(); // Nếu không chọn gì thì load all
                return;
            }
            const response = await getProjectsByStatus(statusFilter);
            setProjects(Array.isArray(response) ? response : []);
            message.success(`Đã lọc các dự án: ${statusFilter}`);
        } catch (error) {
            message.error('Lỗi lọc dữ liệu: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProject(id);
            message.success('Xóa thành công');
            fetchProjects();
            fetchMemberStats(); // Cập nhật lại thống kê
        } catch (error) {
            message.error('Lỗi xóa: ' + error.message);
        }
    };

    const handleFormSubmit = async (values) => {
        try {
            if (editingProject) {
                await updateProject(editingProject._id, values);
                message.success('Cập nhật thành công');
            } else {
                await createProject(values);
                message.success('Thêm thành công');
            }
            setIsModalVisible(false);
            fetchProjects();
            fetchMemberStats(); // Cập nhật lại thống kê
        } catch (error) {
            message.error('Lỗi lưu dữ liệu: ' + error.message);
        }
    };

    const openModal = (record = null) => {
        setEditingProject(record);
        setIsModalVisible(true);
    };

    // --- Render ---
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <Title level={2} style={{ margin: 0, color: '#1f2937' }}>Quản Lý Dự Án</Title>
                </div>

                {/* Statistics Section */}
                <ProjectStats stats={memberStats} />

                {/* Filter & Table Section */}
                <Card className="shadow-sm" bodyStyle={{ padding: '24px' }}>
                    <div className="mb-6">
                        <ProjectFilter
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            onSearch={handleSearch}
                            onReport={handleReport}
                            onOpenModal={() => openModal(null)}
                        />
                    </div>

                    {loading ? (
                        <div className="p-10 text-center"><Spin size="large" /></div>
                    ) : (
                        <ProjectTable
                            projects={projects}
                            loading={loading}
                            onEdit={openModal}
                            onDelete={handleDelete}
                        />
                    )}
                </Card>

                {/* Modal Form */}
                <ProjectModal
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    onSubmit={handleFormSubmit}
                    editingProject={editingProject}
                />
            </div>
        </div>
    );
};

export default Projects;