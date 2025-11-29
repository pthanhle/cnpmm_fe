import instance from './axios.customize';
export const getStudents = async () => instance.get('/students');
export const getStudentById = async (id) => instance.get(`/students/${id}`);
export const createStudent = async (data) => instance.post('/students', data);
export const updateStudent = async (id, data) => instance.put(`/students/${id}`, data);
export const deleteStudent = async (id) => instance.delete(`/students/${id}`);
export const searchStudents = async (search) => instance.get(`/students/search?search=${search}`);
export const getStudentStats = async () => instance.get('/students/stats');

export const getProjects = async () => instance.get('/projects');
export const getProjectById = async (id) => instance.get(`/projects/${id}`);
export const createProject = async (data) => instance.post('/projects', data);
export const updateProject = async (id, data) => instance.put(`/projects/${id}`, data);
export const deleteProject = async (id) => instance.delete(`/projects/${id}`);
export const searchProjects = async (search) => instance.get(`/projects/search?search=${search}`);
export const getProjectsByStatus = async (status) => instance.get(`/projects/report?status=${status}`);
export const getProjectMemberStats = async () => instance.get('/projects/stats');

export const getOrders = async () => instance.get('/orders');
export const getOrderById = async (id) => instance.get(`/orders/${id}`);
export const createOrder = async (data) => instance.post('/orders', data);
export const updateOrder = async (id, data) => instance.put(`/orders/${id}`, data);
export const deleteOrder = async (id) => instance.delete(`/orders/${id}`);
export const getOrderTotalValue = async () => instance.get('/orders/total');
export const getOrderRevenueReport = async (startDate, endDate) => instance.get(`/orders/report?startDate=${startDate}&endDate=${endDate}`);

export const getEmployees = async () => instance.get('/employees');
export const getEmployeeById = async (id) => instance.get(`/employees/${id}`);
export const createEmployee = async (data) => instance.post('/employees', data);
export const updateEmployee = async (id, data) => instance.put(`/employees/${id}`, data);
export const deleteEmployee = async (id) => instance.delete(`/employees/${id}`);
export const searchEmployees = async (search) => instance.get(`/employees/search?search=${search}`);
export const getEmployeeMonthlySalary = async (id) => instance.get(`/employees/${id}/salary`);