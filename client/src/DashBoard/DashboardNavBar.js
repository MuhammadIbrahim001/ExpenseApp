import PropTypes from 'prop-types';

import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';

import Grid from '@mui/material/Grid';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 82;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5)
    }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
    onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar(props) {
    const [matches, setMatches] = React.useState(
        window.matchMedia("(min-width: 768px)").matches
      );
      React.useEffect(() => {
        window
        .matchMedia("(min-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));
      }, []);
      const RootStyle = styled(AppBar)(({ theme }) => ({
    
        boxShadow: 'none',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
        backgroundColor: alpha(theme.palette.background.default, 0.72),
        width: matches?`calc(100% - ${DRAWER_WIDTH+1}px)`:`calc(100% - ${70+1}px)`
    }));
    
  
    return (
        <RootStyle >
            <ToolbarStyle   >
                <p style={{ color: 'black', fontSize: 24, fontWeight:'bold' }}>{props.title}</p>
                <Box sx={{ flexGrow: 1 }} />
            </ToolbarStyle>
        </RootStyle>
    );
}
