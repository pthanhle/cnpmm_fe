import React from 'react';
import { Card, Typography, Spin, Select } from 'antd';
import { useProjects } from './hooks/useProjects';
import PageHeaderAction from '../../components/molecules/PageHeaderAction';
import { ProjectTable, ProjectModal, ProjectStats } from './components';
import { PROJECT_STATUS_LABEL } from '../../constants';

const { Title } = Typography;
const { Option } = Select;

const ProjectFeature = () => {
    const {
        projects, pagination, memberStats, loading,
        searchTerm, setSearchTerm,
        statusFilter, setStatusFilter,
        isModalVisible, editingProject, openModal, closeModal, handleDelete, handleFormSubmit
    } = useProjects();

    return (
        <div className="p-6 bg-gray-50 dark:bg-[#141414] min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">
                <Title level={2} className="!mb-0 !text-gray-800 dark:!text-white">Quản Lý Dự Án</Title>

                <ProjectStats stats={memberStats} />

                <Card className="shadow-sm border-gray-200 dark:border-gray-700 dark:bg-[#1f1f1f]" bodyStyle={{ padding: '24px' }}>
                    <div className="mb-6">
                        <PageHeaderAction
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onSearch={() => { }}
                            onAdd={() => openModal(null)}
                            placeholder="Tìm kiếm dự án..."
                            btnLabel="Thêm Dự Án"
                        >
                            <Select
                                placeholder="Lọc trạng thái"
                                style={{ width: 180 }}
                                value={statusFilter}
                                onChange={setStatusFilter}
                                allowClear
                            >
                                {Object.entries(PROJECT_STATUS_LABEL).map(([key, label]) => (
                                    <Option key={key} value={key}>{label}</Option>
                                ))}
                            </Select>
                        </PageHeaderAction>
                    </div>

                    {loading ? <div className="p-10 text-center"><Spin size="large" /></div> :
                        <ProjectTable
                            projects={projects}
                            loading={loading}
                            onEdit={openModal}
                            onDelete={handleDelete}
                            pagination={pagination}
                        />
                    }
                </Card>

                <ProjectModal visible={isModalVisible} onCancel={closeModal} onSubmit={handleFormSubmit} editingProject={editingProject} />
            </div>
        </div>
    );
};

export default ProjectFeature;