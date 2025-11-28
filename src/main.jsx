import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx'; // Import router
import 'antd/dist/reset.css'; // Import CSS reset của Ant Design (để tránh xung đột style)
import './styles/globals.css'; // Import Tailwind CSS nếu bạn có file này (tạo nếu chưa)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);