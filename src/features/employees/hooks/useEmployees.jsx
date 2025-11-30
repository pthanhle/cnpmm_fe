import React, { useState } from 'react';
import { message, Modal } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
    getEmployeeMonthlySalary
} from '../../../api/employees';
import { formatCurrency } from '../../../shared/utils/format';

export const useEmployees = () => {
    const queryClient = useQueryClient();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: employees = [], isLoading: loadingEmployees } = useQuery({
        queryKey: ['employees', searchTerm],
        queryFn: async () => {
            if (searchTerm.trim()) {
                return await searchEmployees(searchTerm);
            }
            return await getEmployees();
        },
        keepPreviousData: true,
    });

    const createMutation = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            message.success('Thêm nhân viên thành công');
            queryClient.invalidateQueries(['employees']);
            closeModal();
        },
        onError: (error) => message.error('Lỗi thêm: ' + error.message)
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateEmployee(id, data),
        onSuccess: () => {
            message.success('Cập nhật nhân viên thành công');
            queryClient.invalidateQueries(['employees']);
            closeModal();
        },
        onError: (error) => message.error('Lỗi cập nhật: ' + error.message)
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            message.success('Xóa nhân viên thành công');
            queryClient.invalidateQueries(['employees']);
        },
        onError: (error) => message.error('Lỗi xóa: ' + error.message)
    });

    const handleSearch = (term) => setSearchTerm(term);
    const handleDelete = (id) => deleteMutation.mutate(id);

    const handleFormSubmit = (values) => {
        if (editingEmployee) {
            updateMutation.mutate({ id: editingEmployee._id, data: values });
        } else {
            createMutation.mutate(values);
        }
    };

    const handleGetSalary = async (id) => {
        try {
            const response = await getEmployeeMonthlySalary(id);
            Modal.info({
                title: 'Thông Tin Lương',
                content: (
                    <div className="text-center py-4">
                        <p className="text-gray-500">Tổng lương tháng này là:</p>
                        <h2 className="text-2xl font-bold text-green-600">
                            {formatCurrency(response.monthlySalary)}
                        </h2>
                    </div>
                ),
                icon: <DollarCircleOutlined style={{ color: '#52c41a' }} />,
                okText: 'Đóng',
                maskClosable: true,
            });
        } catch (error) {
            message.error('Lỗi tính lương: ' + (error.message || 'Không xác định'));
        }
    };

    const openModal = (record = null) => {
        setEditingEmployee(record);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingEmployee(null);
    };

    const isLoading = loadingEmployees || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    return {
        employees,
        loading: isLoading,
        isModalVisible,
        editingEmployee,
        searchTerm,
        setSearchTerm,
        openModal,
        closeModal,
        handleSearch,
        handleDelete,
        handleFormSubmit,
        handleGetSalary
    };
};