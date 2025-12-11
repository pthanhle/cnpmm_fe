import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/templates/MainLayout";
import Loading from "./components/atoms/Loading";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const InternetPage = lazy(() => import("./pages/InternetPage"));
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
                path: "internet-manager",
                element: Loadable(InternetPage)
            },
            {
                path: "*",
                element: Loadable(NotFound)
            }
        ]
    }
]);

export default router;