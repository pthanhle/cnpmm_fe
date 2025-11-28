import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout.jsx';
import Students from './pages/bai1/students.jsx';
import Home from './pages/Home/home.jsx';
import Example from './pages/bai2/example.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'bai1/students',
                element: <Students />,
            },
            {
                path: 'bai2/example',
                element: <Example />,
            },
            // Thêm route khác tương tự, ví dụ:
            // {
            //   path: 'bai3/other',
            //   element: <Other />,
            // },
        ],
    },
    {
        path: '*',
        element: <div className="text-center text-2xl">Page Not Found</div>,
    },
]);

export default router;