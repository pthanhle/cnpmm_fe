const BASE = '/orders';

export const ORDER_ENDPOINTS = {
    GET_ALL: BASE,
    GET_BY_ID: (id) => `${BASE}/${id}`,
    CREATE: BASE,
    UPDATE: (id) => `${BASE}/${id}`,
    DELETE: (id) => `${BASE}/${id}`,
    TOTAL_VALUE: `${BASE}/total`,
    REVENUE_REPORT: `${BASE}/report`,
};