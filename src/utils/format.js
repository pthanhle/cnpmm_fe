// src/utils/format.js
import dayjs from 'dayjs';
import { DATE_FORMAT, CURRENCY_CONFIG } from '../constants';

/**
 *
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
    if ((!amount && amount !== 0) || isNaN(amount)) return '0 VNĐ';
    return amount.toLocaleString(CURRENCY_CONFIG.locale) + ' VNĐ';
};

/**
 * @param {string|Date} date
 * @param {string} format
 * @returns {string}
 */
export const formatDate = (date, format = DATE_FORMAT) => {
    if (!date) return '';
    return dayjs(date).format(format);
};


export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};