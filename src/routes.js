import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import ThreeD from './pages/ThreeD';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import TwoD from './pages/TwoD';
import DashboardAppPage from './pages/DashboardAppPage';
import Calculation from "./pages/Calculation";
import SignupPage from './pages/SignupPage';
import Users from "./pages/admin/Users";
import Contractors from "./pages/admin/Contractors";
import EState from "./pages/admin/EState";
import FloorPlan from "./pages/admin/FloorPlan";

// ----------------------------------------------------------------------

export default function Router() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/login"  />, 
    },
    {
      path: '/dashboard',
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'TwoD', element: <TwoD /> },
        { path: 'Calculation', element: <Calculation /> },
        { path: 'ThreeD', element: <ThreeD /> },

        { path: 'Users', element: <Users /> },
        { path: 'contractors', element: <Contractors /> },
        { path: 'floorplan', element: <FloorPlan /> },
        { path: 'e-state', element: <EState /> },
      ],
    },
    {
      path: 'login',
      element: isAuthenticated ? <Navigate to="/dashboard/app" /> : <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />,  },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
