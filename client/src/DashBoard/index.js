import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';


import MuiDrawer from '@mui/material/Drawer';
import NavSection from './NavSection';
import sidebarConfig from './SidebarConfig';

import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from "axios";
import ls from "local-storage";

// ----------------------------------------------------------------------



const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',

}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const [drawerWidth, setDrawerWidth] = useState(280);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  const getUserData = async () => {

    await axios.get("http://localhost:5000/getUser/"+ls.get('userID'))
      .then(res => {


        console.log(res.data[0]['name']+"000000000000000000000000000000000000")
        setUserName(res.data[0]['name']);

        console.log(res.data)
      })
      .catch(errr => {
        console.log("error")
        console.log(errr)
      })
  }
  useEffect(() => {
    getUserData();
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener('change', e => setMatches(e.matches));
  }, []);


  const toggleDrawer = () => {
    setOpen(!open);
  };

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: matches === true ? drawerWidth : "85%",
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(9),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8),
          },
        }),
      },
    }),
  );

  return (
    <RootStyle>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            px: [3.5],

          }}
        >

          {matches === false ? null :

            <Box sx={{}}><Typography variant="h6">{userName}</Typography></Box>



          }
        </Toolbar>
        <Divider />
        <NavSection navConfig={sidebarConfig} />


      </Drawer>
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
