import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, createOrder, updateOrder, deleteOrder } from '@/api/orders';
import { message } from 'antd';

export const useOrders = (params) => {
    return useQuery({
        queryKey: ['orders', params],
        queryFn: () => getOrders(params),
        placeholderData: (previousData) => previousData,
    });
};

export const useOrderMutation = () => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            message.success('Tạo đơn hàng thành công');
            queryClient.invalidateQueries(['orders']);
        },
        onError: (err) => message.error(err.message || 'Lỗi khi tạo đơn'),
    });

    const update = useMutation({
        mutationFn: ({ id, data }) => updateOrder(id, data),
        onSuccess: () => {
            message.success('Cập nhật đơn hàng thành công');
            queryClient.invalidateQueries(['orders']);
        },
        onError: (err) => message.error(err.message || 'Lỗi khi cập nhật'),
    });

    const remove = useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
            message.success('Xóa đơn hàng thành công');
            queryClient.invalidateQueries(['orders']);
        },
        onError: (err) => message.error(err.message || 'Lỗi khi xóa'),
    });

    return { create, update, remove };
};