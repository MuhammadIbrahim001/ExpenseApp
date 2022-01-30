import FastfoodIcon from '@mui/icons-material/Fastfood';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBIcon } from 'mdbreact';
const getIcon = (Icon) => <Icon width={22} height={22} ></Icon>;

const Categories = [
    {
        title: "Food",
        icon: <MDBIcon fas icon="utensils" style={{color:"#2D99FF"}}/>
    },
    {
        title: "Bills",
        icon: <MDBIcon icon="file-invoice-dollar" style={{color:"#826AF9"}}/>
    },
    {
        title: "Transportation",
        icon: <MDBIcon fas icon="bus" style={{color:"black"}}/>
    },
    {
        title: "Home",
        icon: <MDBIcon fas icon="home" style={{color:"#FF6C40"}}/>
    },
    {
        title: "Car",
        icon: <MDBIcon fas icon="car" style={{color:"#FF00FF"}}/>
    },
    {
        title: "Shoping",
        icon: <MDBIcon fas icon="shopping-cart" style={{color:"#FF6C40"}}/>
    },
    {
        title: "Clothing",
        icon: <MDBIcon fas icon="tshirt" style={{color:"#2B547E"}}/>
    },
    {
        title: "Tax",
        icon: <MDBIcon fas icon="file-invoice-dollar" style={{color:"#0AFFFF"}}/>
    },
    {
        title: "Mobile",
        icon:<MDBIcon fas icon="mobile" style={{color:"orange"}}/>
    },
    {
        title: "Health",
        icon: <MDBIcon fas icon="medkit" style={{color:"pink"}}/>
    }
    ,
    {
        title: "Vegitables",
        icon: <MDBIcon fas icon="carrot" style={{color:"red"}}/>
    },

    {
        title: "Gift",
        icon: <MDBIcon fas icon="gift" style={{color:"purple"}}/>
    },
    {
        title: "Fruits",
        icon: <MDBIcon fas icon="apple-alt" style={{color:"blue"}}/>
    },
    {
        title: "Education",
        icon: <MDBIcon fas icon="university" style={{color:"orange"}}/>
    },

    {
        title: "Sport",
        icon: <MDBIcon fas icon="futbol" style={{color:""}}/>
    }

]
export default Categories;