import * as React from 'react';
import DashboardNavbar from '../DashBoard/DashboardNavBar'
import { Container, Button, TextField, InputAdornment, Typography, Grid, Box } from '@mui/material'

import VisibilityIcon from '@mui/icons-material/Visibility';

import axios from "axios";
import ls from "local-storage";
import { useNavigate } from 'react-router-dom';
import Popup from "../Views/Popup"

export default function Setting() {
    const [opCheck, setOPCheck] = React.useState(false);
    const [pCheck, setPCheck] = React.useState(false);
    const [cpCheck, setCPCheck] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openProfile, setOpenProfile] = React.useState(false)
    const [openIncome, setOpenIncome] = React.useState(false)
    const [openAbout, setOpenAbout] = React.useState(false)
    const [openContact, setOpenContact] = React.useState(false)
    const navigate = useNavigate();

    const changePassword = async (oldPassword, newPassword) => {

        var uID = ls.get('userID');
        let updatePassword = {
            oldPassword: oldPassword,
            newPassowrd: newPassword,


        };
        await axios.put("http://localhost:5000/auth/ChangePassword/" + uID, updatePassword)
            .then((res) => {
                console.log(res);
                alert(res.status);
                if (res.status === 200) {

                    alert("Password has been updated Sucessfully!")
                    ls.set("token", "")
                    navigate('/login', { replace: true })
                }

            })
            .catch((errr) => {
                console.log("error");
                console.log(errr);
            });
    };
    //-------------update income---------------
    const updateIncome = async (income) => {

        var uID = ls.get('userID');
        let newIncome = {
            income: income,



        };
        await axios.put("http://localhost:5000/income/" + uID, newIncome)
            .then((res) => {
                console.log(res);
                alert(res.status);
                if (res.status === 200) {

                    alert("Income has been updated Sucessfully!")

                    navigate('/dashboard/app', { replace: true })
                }

            })
            .catch((errr) => {
                console.log("error");
                console.log(errr);
            });
    };
    //----------------------------------
    const removeIncome = async () => {
        var uID = ls.get('userID');
        await axios.delete("http://localhost:5000/remove/income/" + uID)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    removeCategories()
                }

            })
            .catch((errr) => {
                console.log("error");
                console.log(errr);
            });
    };
    const removeCategories = async () => {
        var uID = ls.get('userID');
        await axios.delete("http://localhost:5000/remove/categories/" + uID)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {

                    alert("Your data removed successfully")

                    navigate('/dashboard/app', { replace: true })
                }

            })
            .catch((errr) => {
                console.log("error");
                console.log(errr);
            });
    };

    const handleSubmit1 = (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        updateIncome(data.get('income'))


    };
    const handleSubmit = (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);


        if (data.get('confirmpassword') !== data.get('password')) {

            alert("Password don't match. Please Check your password")
        }
        // eslint-disable-next-line no-console
        else {
            changePassword(data.get('oldpassword'), data.get('password'))
            //   signup(data.get('name'), data.get('email'), data.get('password'))
        }
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

    };
    return <Container maxWidth="xl" sx={{ mt: 15, mb: 4 }} >
        <DashboardNavbar title="Settings" />
        {/* <Box sx={{ pb: 5 }}><Typography variant="h5">Setting</Typography></Box> */}
        <Grid direction="rows" container spacing={5} style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <Grid item xs={12} >
                <Container style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: "100px",
                    flexDirection: "row",
                    paddingLeft: 30,

                    background: "#2CD9C5", borderRadius: '8px', boxShadow: "2px 2px 2px 3px #9E9E9E",
                }}>
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        Reset Password
                    </Typography>
                    <h6 onClick={() => {
                        if (open === false) {
                            setOpen(true);
                        }
                        else {
                            setOpen(false)
                        }

                    }}
                        style={{

                            color: "white",

                            cursor: "pointer",



                        }}>
                        {open ? "▲" : "▼"}
                    </h6>
                </Container>


                {open === true ? <Box component="form" onSubmit={handleSubmit} sx={{
                    paddingLeft: "2%", paddingRight: "2%", mt: 5
                }}>
                    <Grid container style={{
                        borderRadius: '8px', boxShadow: "2px 2px 2px 3px #9E9E9E",
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',

                        flexDirection: "column",
                    }}>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="oldpassword"
                                label="Old Password"
                                type={!opCheck ? "password" : "text"}
                                id="oldpassword"
                                autoComplete="new-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <VisibilityIcon style={{ cursor: "pointer" }} onClick={() => {
                                                if (opCheck === false) {
                                                    setOPCheck(true)
                                                }
                                                else {
                                                    setOPCheck(false)
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
                                name="password"
                                label="Password"
                                type={!pCheck ? "password" : "text"}
                                id="password"
                                autoComplete="new-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <VisibilityIcon style={{ cursor: "pointer" }} onClick={() => {
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
                                            <VisibilityIcon style={{ cursor: "pointer" }} onClick={() => {
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
                        </Grid>
                        <Grid item xs={4}>


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submitt
                            </Button>



                        </Grid>

                    </Grid>

                </Box> : null}

            </Grid>

            <Grid item xs={12} >
                <Container style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: "100px",
                    flexDirection: "row",
                    paddingLeft: 30,

                    background: "#2CD9C5", borderRadius: '8px', boxShadow: "2px 2px 2px 3px #9E9E9E",
                }}>
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        Reset Profile
                    </Typography>
                    <h6
                        onClick={() => {
                            if (openProfile === false) {
                                setOpenProfile(true);
                            }
                            else {
                                setOpenProfile(false)
                            }

                        }}
                        style={{

                            color: "white",

                            cursor: "pointer",
                        }}>
                        {openProfile ? "▲" : "▼"}
                    </h6>
                </Container>
                {openProfile === true ? <Container sx={{
                    paddingLeft: "2%", paddingRight: "2%", mt: 5
                }}>
                    <Grid container style={{
                        borderRadius: '8px', boxShadow: "2px 2px 2px 3px #9E9E9E",
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',

                        flexDirection: "column",
                    }}>
                        <Grid item xs={8} sx={{ mt: 5 }}>
                            <p>By clicking the reset button all the data stored in app will be removed. </p>
                        </Grid>
                        <Grid item xs={5}>
                            <Button
                                onClick={() => {

                                    removeIncome();
                                }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Reset
                            </Button>
                        </Grid>

                    </Grid>

                </Container> : null}
            </Grid>
            <Grid item xs={12} >
                <Container style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: "100px",
                    flexDirection: "row",
                    paddingLeft: 30,

                    background: "#2CD9C5", borderRadius: '8px', boxShadow: "2px 2px 2px 3px #9E9E9E",
                }}>
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        Edit Income
                    </Typography>
                    <h6
                        onClick={() => {
                            if (openIncome === false) {
                                setOpenIncome(true);
                            }
                            else {
                                setOpenIncome(false)
                            }

                        }}
                        style={{

                            color: "white",

                            cursor: "pointer",
                        }}>
                        {openIncome ? "▲" : "▼"}
                    </h6>
                </Container>
                {openIncome === true ? <Box component="form" onSubmit={handleSubmit1} sx={{
                    paddingLeft: "2%", paddingRight: "2%", mt: 5
                }}>
                    <Grid container style={{
                        borderRadius: '8px', boxShadow: "2px 2px 2px 3px #9E9E9E",
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',

                        flexDirection: "column",
                    }}>
                        <Grid item xs={8} sx={{ mt: 2, width: 350 }}>
                            <p>  </p>
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
                        </Grid>
                        <Grid item xs={4}>


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submitt
                            </Button>



                        </Grid>
                    </Grid>

                </Box> : null}
            </Grid>
            <Grid item xs={12} >
                <Container style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: "100px",
                    flexDirection: "row",
                    paddingLeft: 30,

                    background: "#2CD9C5", borderRadius: '18px', boxShadow: "2px 2px 2px 3px #9E9E9E",
                }}>
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        About us
                    </Typography>
                    <h6
                        onClick={() => {
                            if (openAbout === false) {
                                setOpenAbout(true);
                            }
                            else {
                                setOpenAbout(false)
                            }

                        }}
                        style={{

                            color: "white",

                            cursor: "pointer",



                        }}>
                        {openAbout ? "▲" : "▼"}
                    </h6>
                </Container>
                {openAbout === true ? <Box component="form" sx={{
                    paddingLeft: "2%", paddingRight: "2%", mt: 5
                }}>
                    <Grid container style={{
                        borderRadius: '8px', boxShadow: "2px 2px 2px 3px #9E9E9E",
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',

                        flexDirection: "column",
                    }}>
                        <Grid item xs={10} sx={{ mt: 5, mb: 5 }}>

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod ligula sapien, sagittis convallis lacus vestibulum et. In hac habitasse platea dictumst. Nullam eget arcu id diam viverra dignissim. Pellentesque dignissim quis nisl sollicitudin consequat. Maecenas pulvinar lacus eu felis tristique, hendrerit gravida arcu auctor. Donec lobortis velit eu velit vestibulum, sit amet consectetur tellus ullamcorper. Pellentesque sodales tortor eu sem cursus euismod. Fusce leo est, porttitor ut tincidunt mollis, iaculis quis nunc. Nam placerat felis lectus, in tempus arcu eleifend a. Morbi mattis mollis dui, non fermentum neque aliquam sit amet. Nullam aliquet, tortor at sollicitudin euismod, purus justo ornare dolor, eu placerat odio est at mauris. In tincidunt lectus vitae arcu aliquam tincidunt. Vestibulum nisi orci, mollis eget tortor eu, ornare placerat sapien. Quisque at sollicitudin ex. Donec ac lobortis dolor, quis pharetra eros. Maecenas auctor lorem odio, at accumsan enim rhoncus at.

                            Donec lobortis bibendum dolor, a maximus elit. Duis tincidunt tellus turpis, et congue purus volutpat quis. Nam quis risus pellentesque, cursus lectus id, efficitur tellus. Praesent suscipit scelerisque lectus, vitae posuere mi aliquet id. Aliquam gravida augue in ex mollis, sed vestibulum mauris fringilla. Aenean a augue tempus, ullamcorper lorem in, scelerisque velit. Aliquam in fringilla risus. Proin placerat rutrum mattis. Maecenas cursus metus non ullamcorper pharetra.

                            Pellentesque vitae mauris metus. Quisque ut tempus mi. Quisque aliquam at est ut elementum. Phasellus tristique leo id odio sodales, id facilisis risus euismod. Ut tempus eu dolor eget aliquam. Aenean in pellentesque quam, et condimentum dui. In hac habitasse platea dictumst. Aenean malesuada ultricies nibh, in viverra neque volutpat ut. Etiam lacinia est in est tempor lacinia. Donec rhoncus pretium sodales.

                            Cras in ante eget dui vehicula semper. Sed maximus mauris quis luctus pellentesque. In in commodo enim. Sed blandit, ipsum eu condimentum feugiat, enim velit volutpat nisi, sed vehicula massa nisi sagittis eros. Nullam ultricies lectus et lacus rhoncus malesuada. Proin nisl mauris, aliquet sit amet finibus in, porttitor ac urna. Donec luctus purus nec tortor dignissim pulvinar.

                            Sed eget mollis ante, auctor gravida mi. Morbi luctus volutpat faucibus. Etiam turpis orci, malesuada nec velit in, mattis rutrum erat. Vestibulum nec velit sed diam ornare ullamcorper. Fusce id hendrerit sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi ac lectus non massa convallis suscipit. Praesent dolor neque, ullamcorper ac egestas et, ultrices a nisi. Mauris commodo nunc ut nibh suscipit interdum. Quisque molestie, magna vitae sagittis ultrices, augue ligula malesuada libero, eget laoreet odio nunc sit amet massa. Nam enim ante, rutrum sed posuere vitae, aliquet bibendum nibh. Phasellus iaculis augue ac ligula auctor vehicula. Nunc lobortis, eros sed sodales facilisis, mi mauris dictum ligula, at fringilla ligula purus at metus. Cras finibus, augue ut tempor finibus, quam quam porta orci, ut mollis erat mi vel nisi. Nam imperdiet est quis velit tincidunt laoreet.



                        </Grid>
                    </Grid>

                </Box> : null}
            </Grid>

        </Grid>
    </Container>;
}
