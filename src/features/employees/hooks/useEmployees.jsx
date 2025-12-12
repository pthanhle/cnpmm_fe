import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '@/api/employees';
import { message } from 'antd';

export const useEmployees = (params) => {
    return useQuery({
        queryKey: ['employees', params],
        queryFn: () => getEmployees(params),
        placeholderData: (previousData) => previousData, // Giữ data cũ khi đang fetch trang mới (UX tốt hơn)
    });
};

export const useEmployeeMutation = () => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            message.success('Thêm nhân viên thành công');
            queryClient.invalidateQueries(['employees']);
        },
        onError: (error) => {
            message.error(error.message || 'Có lỗi xảy ra');
        }
    });

    const update = useMutation({
        mutationFn: ({ id, data }) => updateEmployee(id, data),
        onSuccess: () => {
            message.success('Cập nhật thành công');
            queryClient.invalidateQueries(['employees']);
        },
        onError: (error) => {
            message.error(error.message || 'Có lỗi xảy ra');
        }
    });

    const remove = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            message.success('Xóa nhân viên thành công');
            queryClient.invalidateQueries(['employees']);
        },
        onError: (error) => {
            message.error(error.message || 'Có lỗi xảy ra');
        }
    });

    return { create, update, remove };
};