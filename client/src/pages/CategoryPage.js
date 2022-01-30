import * as React from 'react';

import Container from '@mui/material/Container';



import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import Grid from '@mui/material/Grid';
import { Card, Typography } from '@mui/material';
import DashboardNavbar from '../DashBoard/DashboardNavBar';
import Categories from './CategoriesList';
import Popup from '../Views/Popup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import ls from "local-storage";


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
    backgroundColor: '#D0F2FF',


}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    backgroundColor: 'white',
    marginBottom: theme.spacing(3),
    color: 'black',
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
        theme.palette.primary.dark,
        0.24
    )} 100%)`
}));



export default function Category() {
    const [openPopup, setOpenPopup] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const addExpenseDetails = async ({ title, amount, description }) => {
        alert(title);
        let expenseDetails = {
            userID: ls.get('userID'),
            catergoryName: Categories[selectedIndex]['title'],
            amount: amount,
            title: title,
            description: description,
            date: new Date(),
        };
        await axios.post("http://localhost:5000/add/categories", expenseDetails)
            .then((res1) => {
                console.log(res1);
                // alert(res1);
            })
            .catch((errr) => {
                console.log("error");
                console.log(errr);
            });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console

        alert(data.get('description'))
        setOpenPopup(false);
        addExpenseDetails({ title: data.get('title'), amount: data.get('amount'), description: data.get('description') });
    };
    return <Container maxWidth="xl" sx={{ mt: 15, mb: 4 }} >
        <DashboardNavbar title="Categories" />
        {/* <Box sx={{ pb: 5 }}><Typography variant="h5">Categories</Typography></Box> */}
        <Grid direction="rows" container spacing={5}>
            {Categories.map((item, index) => {
                return (
                    <Grid item xs={12} sm={4}>
                        <RootStyle onClick={() => {
                            setOpenPopup(true);
                            setSelectedIndex(index);
                        }}>
                            <IconWrapperStyle sx={{ height: 45, width: 45 }}>
                                {item.icon}
                            </IconWrapperStyle>
                            {/* <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography> */}
                            <Typography variant="subtitle2" sx={{ opacity: 0.72, fontSize: 18 }}>
                                {item.title}
                            </Typography>
                        </RootStyle>
                    </Grid>
                );
            })}

        </Grid>
        <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            title={"Add Expenses"}>
            <Container style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                fontWeight: 'bold'
            }}>
                <IconWrapperStyle sx={{ height: 50, width: 50 }}>
                    {Categories[selectedIndex]['icon']}
                </IconWrapperStyle>

                <h4 style={{

                    fontWeight: 'bold'
                }}>{Categories[selectedIndex]['title']}</h4>
            </Container>

            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="amount"
                    label="Amount"
                    name="amount"
                    type="number"
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                    }}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    multiline
                    rowsMax={6}
                    rows={6}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, }}
                >
                    submit
                </Button>
            </Box>
        </Popup>
    </Container>;
}
