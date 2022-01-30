
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemIcon from '@mui/material/ListItemIcon';
import CategoryIcon from '@mui/icons-material/Category';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LogoutIcon from '@mui/icons-material/Logout';
import Icon from '@material-ui/core/Icon'
import Logout from "../Login/LogOut"
// ----------------------------------------------------------------------

const getIcon = (Icon) => <Icon  width={22} height={22} ></Icon>;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(DashboardIcon)
  },
  {
    title: 'Categories',
    path: '/dashboard/categories',
    icon: getIcon(CategoryIcon)
  },
  {
    title: 'History',
    path: '/dashboard/history',
    icon: getIcon(HistoryIcon)
  },
  {
    title: 'Setting',
    path: '/dashboard/setting',
    icon: getIcon(SettingsIcon)
  },
  // {
  //   title: 'Contuct Us',
  //   path: '/dashboard/contactus',
  //   icon: getIcon(PermContactCalendarIcon)
  // },
  {
    title: 'Logout',
    path: '/logout',
    icon: getIcon(LogoutIcon)
  },
  // {
  //   title: 'Not found',
  //   path: '/signup',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
