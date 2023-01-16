import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
// apis
import dashboardCountApi from '../apis/dashboardCountApi';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [insights, setInsights] = useState({
    users: 0,
    totalTurnaroundCount: 0,
    completedTodayCount: 0,
    totalTurnaroundCountToday: 0,
    pendingOperationCount: 0,
    todaysTurnaroundData: [],
  });

  useEffect(() => {
  
    async function findUsers(){
      const data = await window.api.getAllUsers()
      if(data){
        console.log(data)
      }
      console.log(data)
    }
    findUsers()
    return ()=>{}
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Products"
              total={insights && insights.users}
              color="info"
              icon={'eva:people-fill'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Orders"
              total={insights && insights.totalTurnaroundCount}
              color="success"
              icon={'ant-design:profile-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Purchases"
              total={insights && insights.totalTurnaroundCountToday}
              color="error"
              icon={'ant-design:calendar-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Users"
              total={insights && insights.completedTodayCount}
              color="warning"
              icon={'eva:checkmark-circle-outline'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Transactions (Today)"
              subheader="Current"
              chartLabels={['GT 123-Y']}
              chartData={[
                {
                  name: 'Turnaround',
                  type: 'gradient',
                  fill: 'solid',
                  data: [36,45],
                },
               
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Tables"
              chartData={[
                { label: 'Products', value: `${insights && insights.totalTurnaroundCount}` },
                { label: 'Users', value: `${insights && insights.users}` },
              ]}
              chartColors={[theme.palette.chart.violet[0], theme.palette.chart.green[0]]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
