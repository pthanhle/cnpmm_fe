const BASE = '/bookings';
export const BOOKING_ENDPOINTS = {
    GET_ALL: BASE,
    CREATE: BASE,
    UPDATE_STATUS: (id) => `${BASE}/${id}`,
    STATS: `${BASE}/stats`,
    VERIFY: (token) => `${BASE}/verify/${token}`
};