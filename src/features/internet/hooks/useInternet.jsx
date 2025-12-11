import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

import {
    getPackages,
    createPackage,
    updatePackage,
    deletePackage,
    getContracts,
    getContractStats,
    getPaymentHistory,
    registerContract,
    createPayment,
    sendContractNotification
} from '@/api/internet';

// --- Hooks ---

export const usePackages = () => {
    return useQuery({
        queryKey: ['packages'],
        queryFn: getPackages,
        select: (response) => response.data,
    });
};

export const useStats = () => {
    return useQuery({
        queryKey: ['contract-stats'],
        queryFn: getContractStats,
        select: (response) => response.data,
    });
};

export const usePaymentHistory = (customerId, open) => {
    return useQuery({
        queryKey: ['payment-history', customerId],
        queryFn: () => getPaymentHistory(customerId),
        enabled: !!customerId && open,
        select: (response) => response.data,
    });
};

export const usePackageActions = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createPackage,
        onSuccess: () => {
            message.success('Thêm gói cước thành công!');
            queryClient.invalidateQueries(['packages']); // Refresh list
        },
        onError: (err) => message.error(err.response?.data?.message || 'Lỗi khi thêm'),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updatePackage(id, data),
        onSuccess: () => {
            message.success('Cập nhật thành công!');
            queryClient.invalidateQueries(['packages']);
        },
        onError: (err) => message.error(err.response?.data?.message || 'Lỗi cập nhật'),
    });

    const deleteMutation = useMutation({
        mutationFn: deletePackage,
        onSuccess: () => {
            message.success('Đã xóa gói cước!');
            queryClient.invalidateQueries(['packages']);
        },
        onError: (err) => message.error(err.response?.data?.error || 'Không thể xóa gói này'),
    });

    return {
        createPkg: createMutation.mutateAsync,
        updatePkg: updateMutation.mutateAsync,
        deletePkg: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};

export const useInternetActions = () => {
    const queryClient = useQueryClient();

    const registerMutation = useMutation({
        mutationFn: registerContract,
        onSuccess: (res) => {
            message.success(res.message || 'Đăng ký thành công!');
            queryClient.invalidateQueries(['contract-stats']);
        },
        onError: (err) => message.error(err.response?.data?.error || 'Đăng ký thất bại'),
    });

    const paymentMutation = useMutation({
        mutationFn: createPayment,
        onSuccess: () => {
            message.success('Thanh toán thành công!');
            queryClient.invalidateQueries(['contract-stats']);
            queryClient.invalidateQueries(['payment-history']);
        },
        onError: (err) => message.error(err.response?.data?.error || 'Thanh toán lỗi'),
    });

    const notifyMutation = useMutation({
        mutationFn: sendContractNotification,
        onSuccess: (res) => message.success(`Đã gửi ${res.logs?.length || 0} thông báo!`),
        onError: () => message.error('Lỗi gửi thông báo'),
    });

    return {
        register: registerMutation.mutateAsync,
        pay: paymentMutation.mutateAsync,
        notify: notifyMutation.mutateAsync,
        isRegistering: registerMutation.isPending,
        isPaying: paymentMutation.isPending,
        isNotifying: notifyMutation.isPending,
    };
};

export const useContracts = (searchParam) => {
    return useQuery({
        queryKey: ['contracts', searchParam],
        queryFn: () => getContracts(searchParam),
        select: (response) => response.data,
    });
};