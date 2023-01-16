
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  CardContent,
  Stack,
  Box,
  Grid,
  Container,
  Typography,
  LinearProgress,
  styled
} from '@mui/material';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';


// ------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Reports() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [requesting, setRequesting] = useState(false);


  // useEffect
  useEffect(() => {

    //  requestTimeout();
    return () => { };
  }, []);

  return (
    <Page title="Reports">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>


        </Stack>
        <Card>
          <CardContent>
            {requesting && <LinearProgress />}
            <Scrollbar>
              <Grid container>
                {
                  [{ title: 'report',count:0 }].map((report, index) => {
                   const {count,title} =report;
                    return (
                      <Grid item key={index} lg={3}>
                        <ReportItemBox>
                          <Typography variant='h6'>{count}</Typography>
                          <Typography variant='h6'>{sentenceCase(title)}</Typography>

                        </ReportItemBox>

                      </Grid>
                    )
                  })
                }
              </Grid>

            </Scrollbar>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

const ReportItemBox = styled(Box)({
  height: '6rem',
  width: 'auto',
  backgroundColor: 'teal',
  background:'linear-gradient(to right,darkgrey,grey)',
  borderRadius:4,
  padding:'1rem',
  color:'#fff'
})