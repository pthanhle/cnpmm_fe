import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout.jsx';
import Students from './pages/bai1/students.jsx';
import Home from './pages/Home/home.jsx';
import Projects from './pages/bai2/projects.jsx';
import Orders from './pages/bai3/orders.jsx';
import Employees from './pages/bai4/employees.jsx';
import NotFound from './pages/NotFound.jsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'bai1/students', element: <Students /> },
            { path: 'bai2/projects', element: <Projects /> },
            { path: 'bai3/orders', element: <Orders /> },
            { path: 'bai4/employees', element: <Employees /> },
        ],
    },
    { path: '*', element: <NotFound /> },
]);

export default router;