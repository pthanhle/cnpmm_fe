const PACKAGES_BASE = '/packages';
const CONTRACTS_BASE = '/contracts';
const PAYMENTS_BASE = '/payments';

export const INTERNET_ENDPOINTS = {
    // Packages
    GET_PACKAGES: PACKAGES_BASE,

    // Contracts
    GET_CONTRACTS: CONTRACTS_BASE,
    REGISTER_CONTRACT: `${CONTRACTS_BASE}/register`,
    GET_STATS: `${CONTRACTS_BASE}/stats`,
    NOTIFY: `${CONTRACTS_BASE}/notify`,

    // Payments
    CREATE_PAYMENT: PAYMENTS_BASE,
    GET_HISTORY: (customerId) => `${PAYMENTS_BASE}/history/${customerId}`,
};