export const DATE_FORMAT = 'DD/MM/YYYY';

export const TOUR_STATUS = {
    ACTIVE: 'active',
    FULL: 'full',
    COMPLETED: 'completed',
    CANCELED: 'canceled'
};

export const TOUR_STATUS_LABEL = {
    [TOUR_STATUS.ACTIVE]: 'Đang mở',
    [TOUR_STATUS.FULL]: 'Đã đầy',
    [TOUR_STATUS.COMPLETED]: 'Đã xong',
    [TOUR_STATUS.CANCELED]: 'Hủy bỏ'
};

export const TOUR_STATUS_COLOR = {
    [TOUR_STATUS.ACTIVE]: 'success',
    [TOUR_STATUS.FULL]: 'warning',
    [TOUR_STATUS.COMPLETED]: 'default',
    [TOUR_STATUS.CANCELED]: 'error'
};

export const BOOKING_STATUS = {
    PENDING_CONFIRMATION: 'pending_confirmation',
    PENDING: 'pending',
    PAID: 'paid',
    CANCELED: 'canceled'
};

export const BOOKING_STATUS_LABEL = {
    [BOOKING_STATUS.PENDING_CONFIRMATION]: 'Chờ xác nhận mail',
    [BOOKING_STATUS.PENDING]: 'Chờ thanh toán',
    [BOOKING_STATUS.PAID]: 'Đã thanh toán',
    [BOOKING_STATUS.CANCELED]: 'Đã hủy'
};

export const BOOKING_STATUS_COLOR = {
    [BOOKING_STATUS.PENDING_CONFIRMATION]: 'purple',
    [BOOKING_STATUS.PENDING]: 'orange',
    [BOOKING_STATUS.PAID]: 'green',
    [BOOKING_STATUS.CANCELED]: 'red'
};