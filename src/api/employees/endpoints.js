const BASE = '/employees';

export const EMPLOYEE_ENDPOINTS = {
    GET_ALL: BASE,
    GET_BY_ID: (id) => `${BASE}/${id}`,
    CREATE: BASE,
    UPDATE: (id) => `${BASE}/${id}`,
    DELETE: (id) => `${BASE}/${id}`,
    SEARCH: `${BASE}/search`,
    GET_SALARY: (id) => `${BASE}/${id}/salary`,
};