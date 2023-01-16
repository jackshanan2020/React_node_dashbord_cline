import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { CSVLink, CSVDownload } from 'react-csv';
import { format } from 'date-fns';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  LinearProgress,
  ButtonGroup,
  Box
} from '@mui/material';

// api
import ordersApi from '../apis/ordersApi';
import inventoryApi from '../apis/inventoryApi';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
  OrderCreateForm,
  OrderMoreMenu,
  OrderToolbar,
  OrderHead,
  OrderViewPane,
  OrderListFilter,
} from '../sections/@dashboard/order';
import InventoryProductListFilterForm from '../sections/@dashboard/inventory/InventoryProductListFilterForm';
import { fCurrency } from '../utils/formatNumber';
// mock
import orders from '../_mock/orders';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'orderId', label: 'Order ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },

  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: 'orderTotal', label: 'Amount', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'createdAt', label: 'Date', alignRight: false },

];

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
    return filter(array, (_order) => _order.id.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Order() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [LIST, setList] = useState([]);

  const [turnaroundData, setTurnaroundData] = useState([]);

  const [open, setOpen] = useState(false);

  const [requesting, setRequesting] = useState(false);

  const [csv, setCSV] = useState([]);

  const [pdtOpen, setPdtOpen] = useState(false);

  const [filterOpen, setFilterOpen] = useState(false);

  const [pdtPurOpen, setPdtPurOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [orderSelect, setOrderSelect] = useState(null);

  const [products, setProducts] = useState([]);

  // useEffect
  useEffect(() => {
    setRequesting(true);
    (
      async function () {
        const res = await ordersApi.fetchOrders();
        if (res) {
          console.log(res.data.orders);
          setList(res.data.orders)
        }
      }
    )();
    requestTimeout();
    return () => { };
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = LIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const requestTimeout = () => {
    setTimeout(() => {
      setRequesting(false);
    }, 5000);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - LIST.length) : 0;

  const filteredUsers = applySortFilter(LIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const formatCSV = (list) => {
    const csvData = [[]];
    /* eslint-disable-next-line no-plusplus */
    for (let i = 0; i < list.length; i++) {
      const tmp = list[i];
      csvData.push([]);
    }
    setCSV(csvData);
  };
  const closeModal = () => {
    setOpen(!open);
  };
  const filterClose = () => setFilterOpen(false);

  const pdtClose = () => setPdtOpen(false);

  const pdtPurClose = () => setPdtPurOpen(false);

  const epoch = Math.round(Date.now() / 1000);
  const handleDelete = async (rowId) => {
    try {
      const res = await inventoryApi.deleteTurnaround(rowId);
      if (res) {
        const index = LIST.findIndex((arr) => arr.id);
        const _index = LIST.indexOf(rowId);
      }
    } catch (error) {
      alert('Something went wrong !');
    }
  };


  const close = () => {
    setPdtPurOpen(false);
    setPdtOpen(false);
  };

  const handleViewOrder = (itemCode) => {
    const item = LIST.filter((l) => l.id === itemCode);
   
  
     console.log(itemCode, LIST);
    setOrderSelect(item && item[0]);
    setViewOpen(true);
  };

  const handleFilter = async (data) => {
    console.log(data);
    setFilterOpen(false);
  };

  return (
    <Page title="Orders">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Sales Orders
          </Typography>
          {/* <Button variant="contained" onClick={()=>setOpen(!open)} startIcon={<Iconify icon="eva:funnel-fill" />}>
            Filter
          </Button> */}
          <ButtonGroup variant="outlined">
            <Button onClick={() => setFilterOpen(true)}>Filter</Button>
            {/* <Button onClick={() => setPdtOpen(!pdtOpen)}>Create Order</Button> */}
            <Button disabled>
              <CSVLink data={csv} filename={`Orders-Report-${epoch}.csv`}>
                Export
              </CSVLink>
            </Button>
          </ButtonGroup>
        </Stack>

        {/* Add new product modal */}
        <Modal open={pdtOpen} onClose={pdtClose}>
          <Box>
            <OrderCreateForm close={pdtClose} products={products} />
          </Box>
        </Modal>
        {/* filter for order list */}
        <Modal open={filterOpen} onClose={filterClose}>
          <div>
            <OrderListFilter close={filterClose} handleFilterSubmit={handleFilter} />
          </div>
        </Modal>

        <Modal open={viewOpen} onClose={pdtPurClose}>
          <div>
            <OrderViewPane close={() => setViewOpen(false)} order={orderSelect && orderSelect || {}} />
          </div>
        </Modal>
        <Card>
          {requesting && <LinearProgress />}
          <OrderToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OrderHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={LIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {LIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { 
                      id, 
                      firstName, 
                      lastName, 
                      method, 
                      orderId,
                      orderAmount, 
                      orderCity, 
                      orderCountry, 
                      orderDate,
                      orderPhone,
                      orderQuantity,
                      orderShipAddress1,
                      orderShipAddress2,
                      orderShipped,
                      orderState,
                      orderTrackingNumber,
                      orderZip,
                      paymentMethod,
                      pickupDate,
                      status,
                      userID,
                      email,
                      createdAt
                    } = row;
                    const fullName = `${firstName} ${lastName}`;
                    const isItemSelected = selected.indexOf(orderId) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, orderId)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {orderId}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{fullName}</TableCell>
                        <TableCell align="left">{orderPhone}</TableCell>
                        <TableCell align="left">{orderCity}</TableCell>
                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{orderQuantity}</TableCell>
                        <TableCell align="left">{fCurrency(orderAmount)}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={
                              (status === 'paid' && 'success') ||
                              (status === 'pending' && 'info') ||
                              (status === 'canceled' && 'error') ||
                              'default'
                            }
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">{format(new Date(createdAt),'dd/MM/YYY')}</TableCell>

                        <TableCell align="right">
                          <OrderMoreMenu rowId={id} handleDelete={handleDelete} view={handleViewOrder} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={LIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
