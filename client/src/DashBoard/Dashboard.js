import * as React from 'react';
import { createTheme, ThemeProvider, alpha, styled } from '@mui/material/styles';


import { TextField, Container, Button, Grid, Toolbar, Typography, Box } from '@mui/material';
import DashboardNavbar from './DashboardNavBar';
import Income from '../Views/Income'
import Expense from '../Views/Expences'
import Balance from '../Views/Balance'
import Categories from '../Views/TopCategories';
import TopCategories from '../Chart/Chart';
import MontlyExpenses from '../Chart/MontlyExpensesChart';
import axios from "axios";
import ls from "local-storage";
import CategoriesList from '../pages/CategoriesList'

import Popup from "../Views/Popup";
import { useNavigate } from 'react-router-dom';

const mdTheme = createTheme();
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
function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [topCategories, setToCategories] = React.useState([]);
  const [monthlyExpenses, setmonthlyExpenses] = React.useState([]);
  const [totalIncome, setTotalIncome] = React.useState(0);
  const [totalExpenses, setTotalExpenses] = React.useState(0);
 
  const navigate = useNavigate();
  const addIncome = async (amount) => {

    let addIncome = {
      userID: ls.get('userID'),
      income: amount,


    };
    await axios.post("http://localhost:5000/add/income", addIncome)
      .then((res1) => {
        console.log(res1);
        getTotalIncome();

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



    // setOpenPopup(false);
    addIncome(data.get('income'));
    // addExpenseDetails({ title: data.get('title'), amount: data.get('amount'), description: data.get('description') });
  };
  
  
  const getTotalExpense = async () => {

    await axios.get("http://localhost:5000/total/expense/"+ls.get('userID'))
      .then(res => {


        console.log(res.data[0]['sum'])
        setTotalExpenses(res.data[0]['sum']);

        console.log(res.data)
      })
      .catch(errr => {
        console.log("error")
        console.log(errr)
      })
  }
  const getMonthlyExpenses = async () => {

    await axios.get("http://localhost:5000/monthly/expenses/"+ls.get('userID'),)
      .then(res => {
        setmonthlyExpenses(res.data);
        console.log(res.data)
      })
      .catch(errr => {
        console.log("error")
        console.log(errr)
      })
  }
  const getTotalIncome = async () => {

    await axios.get("http://localhost:5000/total/income/" + ls.get('userID'))
      .then(res => {
        if (res.data !== null) {
          setTotalIncome(res.data[0]["totalIncome"]);
        }
        console.log(res.data)

      })
      .catch(errr => {
        console.log("error")
        console.log(errr)
      })
  }
  const getTopCategories = async () => {
    await axios.get("http://localhost:5000/top/categories/"+ls.get('userID'),)
      .then(res => {
        setToCategories(res.data);
        console.log(res.data)
      })
      .catch(errr => {
        console.log("error")
        console.log(errr)
      })
  }
  React.useEffect(() => {
    getTopCategories();
    getMonthlyExpenses();
    getTotalIncome();
    getTotalExpense();

  }, []);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{
        display: 'flex',
      }}>
        <DashboardNavbar title="Dashboard" />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
            <Box sx={{
              pb: 5, display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: "row",
            }}><Typography variant="h5">Hi, Welcome back</Typography>
              <Button
                variant="contained"
                style={{
                  color: "white",
                  width: "10%",
                }}
                onClick={() => {
                  setOpen(true);

                }}
              >
                Add Income
              </Button></Box>
            <Grid style={{
              display: 'flex',
              justifyContent: 'space-around',
              paddingLeft: 10,
              paddingRight: 50,
              paddingBottom: 20,
            }} container spacing={3}>
              <Grid onClick={() => {
                ls.set("token", "")
              }} item xs={12} md={3}>
                <Income totalIncome={totalIncome} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Expense totalExpenses={totalExpenses} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Balance balance={totalIncome - totalExpenses} />
              </Grid>
            </Grid>
            <Box sx={{ pb: 5 }}><Typography variant="h5">Top Categories</Typography></Box>
            {
              topCategories.length !== 0 ? 
              <Grid style={{
                display: 'flex',
                justifyContent: 'space-around',
                paddingLeft: 60,
                paddingRight: 60,
                paddingTop: 10,
              }} container spacing={3}>
                {topCategories &&
                  topCategories.map((item) => {
                    return (CategoriesList.map((category) => {
                      return (
                        category.title === item._id ?
                          <Grid item xs={12} md={3}>
                            <Categories title={item._id} expense={item.sum} icon={category.icon} />
                          </Grid> : null)
                    }))
                  })
                }
                {topCategories.length > 2?<Grid item xs={12} md={6} lg={8}>
                  <MontlyExpenses monthlyExpenses={monthlyExpenses} />
                </Grid>:null}
                {topCategories.length === 4 ? <Grid item xs={12} md={6} lg={4}>
                  <TopCategories topCategories={topCategories} />
                </Grid> : null}
              </Grid> : <Box sx={{

                pt: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:'column'
              }}><Typography variant="h5">No categories available </Typography>
                <Button
                  variant="contained"
                  style={{
                    color: "white",
                    width: "13%",
                    marginTop:25,
                  }}
                  onClick={() => {
                    navigate('/dashboard/categories', { replace: true })

                  }}
                >
                  Add Categories
                </Button>
              </Box>
            }



          </Container>
        </Box>
      </Box>
      <Popup
        openPopup={open}
        setOpenPopup={setOpen}
        title={"Add Income"}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 10, }}>
          <Container style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <IconWrapperStyle> <img style={{
              height: 40, width: 40,
            }}
              src="https://img.icons8.com/material-outlined/24/000000/low-price.png" alt='' />
            </IconWrapperStyle>
            <h4 style={{

              fontWeight: 'bold'
            }}>Income</h4>
          </Container>
          <TextField
            margin="normal"
            required
            fullWidth
            id="income"
            label="Income"
            name="income"
            type="number"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
            }}
          />
          <Button
            onClick={() => {
              setOpen(false);


            }}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, }}
          >
            submit
          </Button>
        </Box>
      </Popup>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
