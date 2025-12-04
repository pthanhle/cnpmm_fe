// src/utils/format.js
import dayjs from 'dayjs';
import { DATE_FORMAT, CURRENCY_CONFIG } from '../constants';

export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '0 ₫';
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const formatDate = (date, format = 'DD/MM/YYYY') => {
    if (!date) return '';
    return dayjs(date).format(format);
};