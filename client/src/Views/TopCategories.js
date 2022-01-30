
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { replace } from 'lodash';
import numeral from 'numeral';
import { MDBIcon } from 'mdbreact';
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  borderRadius: '15px',
  height: "200px",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2, 5),
  flexDirection: 'column',
  color: theme.palette.primary.darker,
  backgroundColor: '#CCFAFF',


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

const TOTAL = 714000;

export default function TopCategories(props) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        {props.icon}
      </IconWrapperStyle>
      <Typography variant="h6">${replace(numeral(props.expense).format('0.00a'), '.00', '')}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>

        {props.title}
      </Typography>
    </RootStyle>
  );
}
