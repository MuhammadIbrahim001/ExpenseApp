import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DashboardNavbar from '../DashBoard/DashboardNavBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from 'moment';
import axios from "axios";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const names = [
    "Food",
    "Bills",
    "Transportation",
    "Home",
    "Car",
    "Shoping",
    "Clothing",
    "Tax",
    "Mobile Phone",
    "Health",
    "Vegitabeles",
    "Gifts",
    "Fruits",
    "Education",
    "Sport",

];

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        'VISA ⠀•••• 2574',
        866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        'AMEX ⠀•••• 2000',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        'VISA ⠀•••• 5919',
        212.79,
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function History() {
    const [catergory, setCategory] = React.useState(names[0]);
    const [catergoryData, setCategoryData] = React.useState([]);
    React.useEffect(() => {

        getCategories(catergory);


        // addDetailedUseCases();
        // addFRs();

    }, []);
    const getCategories = (value) => {

        axios.get("http://localhost:5000/categoies/" + value)
            .then(res => {
                setCategoryData(res.data);
                console.log(res.data)
                
            })
            .catch(errr => {
                console.log("error")
                console.log(errr)
            })

    }


    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setCategory(
            // On autofill we get a stringified value.
            value
        );
        getCategories(value);
    };
    return (
        <Container maxWidth="xl" sx={{ mt: 15, mb: 4 }} >
            <DashboardNavbar title="History" />

            <Grid direction="rows" container spacing={5}>
                <Grid item xs={6}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={catergory}
                            onChange={handleChange}
                            input={<OutlinedInput label="Category" />}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl></Grid>
                <Grid item xs={12} >
                    <React.Fragment>
                        {/*    */}
                        <Table size="small">
                            <TableHead style={{
                                color: 'white', backgroundColor: '#2CD9C5', height: 64,
                            }}>
                                <TableRow >
                                    <TableCell style={{
                                        color: 'white'
                                    }}>Sr.</TableCell>
                                    <TableCell style={{
                                        color: 'white'
                                    }}>Category</TableCell>
                                    <TableCell style={{
                                        color: 'white'


                                    }}>Title</TableCell>
                                    <TableCell style={{
                                        color: 'white'


                                    }}>Description</TableCell>
                                    <TableCell style={{
                                        color: 'white'


                                    }}>Date</TableCell>
                                    <TableCell style={{
                                        color: 'white'


                                    }} >Amount</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {catergoryData.length !== 0 ? catergoryData.map((row, index) => (
                                    <TableRow style={{
                                        height: 60


                                    }} key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.catergoryName}</TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{moment(row.date).format("YYYY/MM/DD")}</TableCell>
                                        <TableCell >{`$${row.amount}`}</TableCell>
                                    </TableRow>
                                )) : <TableRow style={{
                                    height: 90


                                }}>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>No data availabe</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>}
                            </TableBody>
                        </Table>

                    </React.Fragment>
                </Grid>



            </Grid>

        </Container>

    );
}