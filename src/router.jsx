import React, { Suspense, lazy } from "react";
import Layout from "./components/layouts/MainLayout";
import Loading from "./components/atoms/Loading";
import ProtectedRoute from "./components/layouts/ProtectedRoute";

// --- Lazy Load Pages ---
const Home = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ForbiddenPage = lazy(() => import("./pages/ForbiddenPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const VerifyPage = lazy(() => import("./pages/VerifyPage"));

// --- Lazy Load Features ---
const PublicTours = lazy(() => import("@/features/public-tours"));
const AdminTours = lazy(() => import("@/features/admin-tours"));
const AdminBookings = lazy(() => import("@/features/admin-bookings"));
const TourDetail = lazy(() => import("@/features/public-tours/components/TourDetail"));
const AdminStats = lazy(() => import("@/features/admin-stats"));

const Loadable = (Component) => (
    <Suspense fallback={<Loading />}>
        <Component />
    </Suspense>
);

export const routes = [
    {
        path: "/login",
        element: Loadable(LoginPage)
    },
    {
        path: "/403",
        element: Loadable(ForbiddenPage)
    },
    {
        path: "/verify-booking/:token",
        element: Loadable(VerifyPage)
    },
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
                path: "tours",
                element: Loadable(PublicTours)
            },
            {
                path: "tours/:id",
                element: Loadable(TourDetail)
            },

            {
                element: <ProtectedRoute allowedRoles={['admin']} />,
                children: [
                    { path: "admin/tours", element: Loadable(AdminTours) },
                    { path: "admin/bookings", element: Loadable(AdminBookings) },
                    { path: "admin/dashboard", element: Loadable(AdminStats) },
                ]
            },

            {
                path: "*",
                element: Loadable(NotFound)
            }
        ]
    }
];