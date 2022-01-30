import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ExpenseImage from "../assets/expense_management.jpg"
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment } from '@mui/material';
import axios from "axios";
import ls from "local-storage";
import { useNavigate } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Expense App
      {/* <Link color="inherit" href="https://mui.com/">
       
      </Link> */}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();

export default function SignUp() {
  const [pCheck, setPCheck] = React.useState(false);
  const [cpCheck, setCPCheck] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [matches, setMatches] = React.useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  React.useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener('change', e => setMatches(e.matches));
  }, []);
  const navigate = useNavigate();
  const signup = async (name, email, password) => {
    
    let userDetail = {
      name: name,
      email: email,
      password: password

    };
    await axios.post("http://localhost:5000/auth/signup", userDetail)
      .then((res1) => {
        
        ls.set("token", res1.data.token);
        ls.set("userID", res1.data.userId)
        
        if (res1.data.status === "Ok") {
          navigate('/dashboard/app', { replace: true })
          setStatus(res1.data.status);
        }
        else {

        }
        console.log(res1.data);
        
      })
      .catch((errr) => {
        console.log("error");

        console.log(errr);
      });
  };
  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);


    if (data.get('confirmpassword') !== data.get('password')) {

      alert("Password don't match. Please Check your password")
    }
    // eslint-disable-next-line no-console
    else {
      signup(data.get('name'), data.get('email'), data.get('password'))
    }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

  };

  return (
    <Paper style={{
      width: "100%",
      minHeight: "100vh",
      '--color-1': "#2CD9C5",
      '--color-2': ' #667eea ',

      background: `
      linear-gradient(
        180deg,
        var(--color-1),
        var(--color-2) 80%
        
        
        
      )
    `,

      // Unrelated styles:

      padding: 30,
      display: 'flex',
      flexDirection: matches ? 'row' : 'column',

      justifyContent: 'space-around'
    }}>
      <Container style={{
        textAlign: 'left',

        margin: '6% 15% 0px  auto '
      }}>
        <h1 style={{ fontFamily: 'Sacramento', color: '#dfe9f3', fontSize: 50 }}>Expense App</h1>
        <p style={{ fontFamily: 'Sacramento', color: '#dfe9f3' }}>Application that helps you manage and track your daily expenses. Designed to be simple and intuitive, this expense tracker app will help you to be aware of what is happening in your own wallet. A great budget manager tool for everyone who is concerned about their spending.</p></Container>
      <Container style={{

        '--color-1': "#dfe9f3",
        '--color-2': ' #c2e9fb ',

        background: `
        linear-gradient(
        180deg,
        var(--color-1),
        var(--color-2) 80%
        )`,
        border: "none",

        borderRadius: "15px",
      }} component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ mt: 3, mb: 3 }} component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{
            mb: 5,

          }}>
            <TextField
              margin="normal"
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              type="email"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={!pCheck ? "password" : "text"}
              id="password"
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <VisibilityIcon style={{cursor: "pointer"}} onClick={() => {
                      if (pCheck === false) {
                        setPCheck(true)
                      }
                      else {
                        setPCheck(false)
                      }
                    }} ></VisibilityIcon>
                  </InputAdornment>
          ),
              }}


            />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmpassword"
            label="Confirm Password"
            type={!cpCheck ? "password" : "text"}
            id="confirmpassword"
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <VisibilityIcon style={{cursor: "pointer"}} onClick={() => {
                    if (cpCheck === false) {
                      setCPCheck(true)
                    }
                    else {
                      setCPCheck(false)
                    }

                  }}></VisibilityIcon>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container >
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>



        </Box>

      </Box>

      <Copyright sx={{ mt: 5 }} />

      <br></br>
    </Container>
    </Paper >
  );
}