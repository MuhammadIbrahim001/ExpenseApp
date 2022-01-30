
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { replace } from 'lodash';
import numeral from 'numeral';
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    borderRadius: '15px',
    height:"250px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(5, 5),
    flexDirection: 'column',
    color: theme.palette.primary.darker,
    backgroundColor: '#FFE7D9',
    width:'115%'
  
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

// ----------------------------------------------------------------------

const TOTAL = 7141;

export default function Balance(props) {
  return (
    <RootStyle>
      <IconWrapperStyle>
      <img style={{height:40,width:40}} src="https://img.icons8.com/external-itim2101-lineal-itim2101/64/000000/external-balance-money-and-economy-itim2101-lineal-itim2101.png" alt=''/>
      </IconWrapperStyle>
      <Typography variant="h3">${replace(numeral(props.balance).format('0.00a'), '.00', '')}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Balance
      </Typography>
    </RootStyle>
  );
}
