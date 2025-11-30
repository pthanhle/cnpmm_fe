import { useState } from 'react';
import { message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    searchStudents,
    getStudentStats
} from '../../../api/students';
import { useDebounce } from '../../../hooks/useDebounce';

export const useStudents = () => {
    const queryClient = useQueryClient();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    // 1. State nhập liệu (Thay đổi ngay lập tức khi gõ phím để UI mượt)
    const [searchTerm, setSearchTerm] = useState('');

    // 2. State Debounce (Chỉ thay đổi sau 300ms dừng gõ)
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const { data: students = [], isLoading: loadingStudents } = useQuery({
        // [QUAN TRỌNG] React Query chỉ chạy lại khi debouncedSearchTerm thay đổi
        queryKey: ['students', debouncedSearchTerm],

        queryFn: async () => {
            // [FIX LỖI TẠI ĐÂY]: Phải kiểm tra debouncedSearchTerm chứ không phải searchTerm
            if (debouncedSearchTerm.trim()) {
                return await searchStudents(debouncedSearchTerm);
            }
            return await getStudents();
        },
        keepPreviousData: true,
    });

    // ... (Phần Stats, Mutation giữ nguyên không đổi) ...
    const { data: stats = { max: null, min: null } } = useQuery({
        queryKey: ['studentStats', students],
        queryFn: getStudentStats
    });

    const createMutation = useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            message.success('Thêm sinh viên thành công');
            queryClient.invalidateQueries(['students']);
            queryClient.invalidateQueries(['studentStats']);
            closeModal();
        },
        onError: (error) => message.error('Lỗi thêm: ' + (error.response?.data?.message || error.message))
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateStudent(id, data),
        onSuccess: () => {
            message.success('Cập nhật thành công');
            queryClient.invalidateQueries(['students']);
            queryClient.invalidateQueries(['studentStats']);
            closeModal();
        },
        onError: (error) => message.error('Lỗi cập nhật: ' + (error.response?.data?.message || error.message))
    });

    const deleteMutation = useMutation({
        mutationFn: deleteStudent,
        onSuccess: () => {
            message.success('Xóa thành công');
            queryClient.invalidateQueries(['students']);
            queryClient.invalidateQueries(['studentStats']);
        },
        onError: (error) => message.error('Lỗi xóa: ' + (error.response?.data?.message || error.message))
    });

    // Actions
    // Hàm này sẽ được gắn vào onChange của Input
    const handleSearch = (term) => setSearchTerm(term);

    const handleDelete = (id) => deleteMutation.mutate(id);

    const handleFormSubmit = (values) => {
        if (editingStudent) updateMutation.mutate({ id: editingStudent._id, data: values });
        else createMutation.mutate(values);
    };

    const openModal = (record = null) => {
        setEditingStudent(record);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingStudent(null);
    };

    const isLoading = loadingStudents || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    return {
        students,
        stats,
        loading: isLoading,
        isModalVisible,
        editingStudent,
        searchTerm,     // Trả về state gốc để hiển thị trên Input
        setSearchTerm,  // Trả về hàm set state
        openModal,
        closeModal,
        handleSearch,
        handleDelete,
        handleFormSubmit
    };
};