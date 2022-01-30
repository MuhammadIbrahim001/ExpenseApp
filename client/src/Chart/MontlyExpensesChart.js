import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
// import { fNumber } from '../../../utils/formatNumber';
//
import BaseOptionChart from './BaseOptions';

// ----------------------------------------------------------------------



export default function MonthlyExpenses(props) {
  
  let array = [];
  if (props.monthlyExpenses.length !== 0) {
    for (let i = 0; i < 12; i++) {
      let check =false;
      for (let j = 0; j < props.monthlyExpenses.length; j++) {
        // console.log(props.monthlyExpenses[j]["_id"]);
        if (i+1 === props.monthlyExpenses[j]["_id"]) {
          
          array[i] = props.monthlyExpenses[j]["fieldN"];
          check=true;
        }
        
      }
      if(check===false){
        array[i]=0;
      }
      console.log(array[i]);
    }
  }
  console.log(array)
  const CHART_DATA = [props.monthlyExpenses.length === 0 ? {
    data: [0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
    : { data: [array[0],array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11]] }];

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => seriesName,
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: [
        'January',
        'Feburary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
    }
  });

  return (
    <Card>
      <CardHeader title="Monthly Expenses" subheader="" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
