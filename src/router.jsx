import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/templates/MainLayout";
import Loading from "./components/atoms/Loading";

const Home = lazy(() => import("./pages/Home"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const EmployeePage = lazy(() => import("./pages/EmployeePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Loadable = (Component) => (
    <Suspense fallback={<Loading />}>
        <Component />
    </Suspense>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: Loadable(NotFound),
        children: [
            {
                index: true,
                element: Loadable(Home)
            },
            {
                path: "bai1/orders",
                element: Loadable(OrderPage)
            },
            {
                path: "bai2/employees",
                element: Loadable(EmployeePage)
            },
            {
                path: "*",
                element: Loadable(NotFound)
            }
        ]
    }
]);

export default router;