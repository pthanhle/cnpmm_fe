import React, { useState } from 'react';
import { Card, Typography, Spin, Select, Button } from 'antd';
import { useProjects } from './hooks/useProjects';
import PageHeaderAction from '../../components/molecules/PageHeaderAction';
import { PROJECT_STATUS_LABEL, PROJECT_STATUS } from '../../shared/constants';
import { ProjectTable, ProjectStats, ProjectModal } from './components';

const { Title } = Typography;
const { Option } = Select;

const ProjectFeature = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const {
        projects,
        memberStats,
        loading,
        statusFilter,
        setStatusFilter,
        isModalVisible,
        editingProject,
        openModal,
        closeModal,
        handleSearch,
        handleFilterStatus,
        handleDelete,
        handleFormSubmit
    } = useProjects();

    const onSearch = () => handleSearch(searchTerm);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <Title level={2} style={{ margin: 0, color: '#1f2937' }}>Quản Lý Dự Án</Title>
                </div>

                <ProjectStats stats={memberStats} />

                <Card className="shadow-sm" bodyStyle={{ padding: '24px' }}>
                    <div className="mb-6">
                        <PageHeaderAction
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onSearch={onSearch}
                            onAdd={() => openModal(null)}
                            placeholder="Tìm kiếm dự án..."
                            btnLabel="Thêm Dự Án"
                        >
                            <div className="flex gap-2">
                                <Select
                                    placeholder="Lọc trạng thái"
                                    value={statusFilter}
                                    onChange={setStatusFilter}
                                    style={{ width: 180 }}
                                    allowClear
                                >
                                    {Object.values(PROJECT_STATUS).map(status => (
                                        <Option key={status} value={status}>
                                            {PROJECT_STATUS_LABEL[status]}
                                        </Option>
                                    ))}
                                </Select>
                                <Button onClick={handleFilterStatus}>Lọc</Button>
                            </div>
                        </PageHeaderAction>
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

                <ProjectModal
                    visible={isModalVisible}
                    onCancel={closeModal}
                    onSubmit={handleFormSubmit}
                    editingProject={editingProject}
                />
            </div>
        </div>
    );
};

export default ProjectFeature;