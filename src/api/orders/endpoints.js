const BASE = '/orders';

export const ORDER_ENDPOINTS = {
    GET_ALL: BASE,
    CREATE: BASE,
    UPDATE: (id) => `${BASE}/${id}`,
    DELETE: (id) => `${BASE}/${id}`,
    REPORT: `${BASE}/report`
};