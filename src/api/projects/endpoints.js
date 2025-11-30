const BASE = '/projects';

export const PROJECT_ENDPOINTS = {
    GET_ALL: BASE,
    GET_BY_ID: (id) => `${BASE}/${id}`,
    CREATE: BASE,
    UPDATE: (id) => `${BASE}/${id}`,
    DELETE: (id) => `${BASE}/${id}`,
    SEARCH: `${BASE}/search`,
    REPORT_BY_STATUS: `${BASE}/report`,
    STATS_MEMBER: `${BASE}/stats`,
};