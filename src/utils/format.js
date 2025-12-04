import dayjs from 'dayjs';

export const formatCurrency = (amount) => {
    if ((!amount && amount !== 0) || isNaN(amount)) return '0 ₫';
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const formatDate = (date, format = 'DD/MM/YYYY') => {
    if (!date) return '';
    return dayjs(date).format(format);
};