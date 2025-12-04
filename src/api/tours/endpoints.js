const BASE = '/tours';
export const TOUR_ENDPOINTS = {
    GET_ALL: BASE,
    GET_BY_ID: (id) => `${BASE}/${id}`,
    CREATE: BASE,
    UPDATE: (id) => `${BASE}/${id}`,
    DELETE: (id) => `${BASE}/${id}`,
};