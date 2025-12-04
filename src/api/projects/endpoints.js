const BASE = '/projects';

export const PROJECT_ENDPOINTS = {
    GET_ALL: BASE, // API này trả về list + memberCount nếu gọi /api/projects?status=...
    CREATE: BASE,
    UPDATE: (id) => `${BASE}/${id}`,
    DELETE: (id) => `${BASE}/${id}`,
    SEARCH: `${BASE}/search`
};