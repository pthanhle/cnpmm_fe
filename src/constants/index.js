// src/constants/index.js

export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_FORMAT_API = 'YYYY-MM-DD';

export const CURRENCY_CONFIG = {
    locale: 'vi-VN',
    currency: 'VND'
};

export const PROJECT_STATUS = {
    ONGOING: 'ongoing',
    COMPLETED: 'completed',
    CANCELED: 'canceled'
};

export const PROJECT_STATUS_LABEL = {
    [PROJECT_STATUS.ONGOING]: 'Đang thực hiện',
    [PROJECT_STATUS.COMPLETED]: 'Hoàn thành',
    [PROJECT_STATUS.CANCELED]: 'Hủy bỏ'
};

export const PROJECT_STATUS_COLOR = {
    [PROJECT_STATUS.ONGOING]: 'processing',
    [PROJECT_STATUS.COMPLETED]: 'success',
    [PROJECT_STATUS.CANCELED]: 'error'
};

export const MENU_KEYS = {
    HOME: 'home',
    PROJECTS: 'projects',
    ORDERS: 'orders',
};