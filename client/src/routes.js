import { Navigate, useRoutes, } from 'react-router-dom';
// layouts
import NavSection from './DashBoard';
import Dashboard from './DashBoard/Dashboard';
import sidebarConfig from './DashBoard/SidebarConfig'
import SignIn from './Login/SignIn';
import SignUp from './Login/SignUp';
import CategoriesPage from './pages/CategoryPage';
import History from './pages/History';
import ContactUs from './pages/ContactUs'
import Setting from './pages/Setting';
import Logout from "./Login/LogOut"
import ls from "local-storage";



// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // { path: '/', element: <SignIn /> },
    {
      path: '/dashboard',
      element: ls.get('token') !== "" ? <NavSection /> : <Navigate to="/login" replace />,
      children: [
        { path: '/dashboard', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <Dashboard /> },
        { path: 'categories', element: <CategoriesPage /> },
        { path: 'history', element: <History /> },
        { path: 'contactus', element: <ContactUs /> },
        { path: 'setting', element: <Setting /> }
      ]
    },
    {
      path: '/register',
      element: ls.get('token') !== "" ? <Navigate to="/dashboard/app" replace /> : <SignUp />,
    },
    {
      path: '/login',
      element: ls.get('token') !== "" ? <Navigate to="/dashboard/app" replace /> : <SignIn />,
    },
    {
      path: '/logout',
      element: ls.get('token') !== "" ? <Logout ></Logout> : <Navigate to="/login" replace />,

    },

    {
      path: '/',
      element: ls.get('token') !== "" ? <Navigate to="/dashboard/app" replace /> : <Navigate to="/login" replace />,
    },
    // { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
