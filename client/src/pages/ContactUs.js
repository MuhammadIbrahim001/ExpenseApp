import * as React from 'react';

import Container from '@mui/material/Container';


import Categories from './CategoriesList';
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import Grid from '@mui/material/Grid';
import { Card, Typography } from '@mui/material';
import DashboardNavbar from '../DashBoard/DashboardNavBar'


const drawerWidth = 280;


const IconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',


});
const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    borderRadius: '15px',
    height: "200px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(5, 5),
    flexDirection: 'column',
    color: theme.palette.primary.darker,
    backgroundColor: '#FFE7D9',


}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),

    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
        theme.palette.primary.dark,
        0.24
    )} 100%)`
}));



export default function Dashboard() {
    return <Container maxWidth="xl" sx={{ mt: 15, mb: 4 }} >
        <DashboardNavbar title="Contact Us" />
        {/* <Box sx={{ pb: 5 }}><Typography variant="h5">Contact Us</Typography></Box> */}
        <Grid direction="rows" container spacing={5}>
            {Categories.map((item) => {
                return (
                    <Grid item xs={12} sm={4}>
                        <RootStyle>
                            <IconWrapperStyle>
                                {item.icon}
                            </IconWrapperStyle>
                            {/* <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography> */}
                            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                                {item.title}
                            </Typography>
                        </RootStyle>
                    </Grid>
                );
            })}

        </Grid>
    </Container>;
}
