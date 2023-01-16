import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { CSVLink, CSVDownload } from 'react-csv';
import { format } from 'date-fns';
// material
import {
  Card,
  Table,
  Stack,
  Box,
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
  ButtonGroup
} from '@mui/material';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { InventoryToolbar, InventoryMoreMenu } from '../../sections/@dashboard/inventory';
import InventoryProductListFilterForm from '../../sections/@dashboard/inventory/InventoryProductListFilterForm';
import TableMoreMenu from '../../components/TableMoreMenu';
import EditBrandForm from '../../sections/@dashboard/settings/EditBrand';
// api
import TableHeader from '../../components/table/TableHeader';
import brandApi from '../../apis/brandApi';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'logo', label: 'Logo', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'createdOn', label: 'Created At', alignRight: false },
  { id: '' }
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ListBrand() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [LIST, setList] = useState([]);

  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  const [requesting, setRequesting] = useState(false);

  const [csv, setCSV] = useState([]);

  const [pdtOpen, setPdtOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [selRow, setSelRow] = useState(null)

  // useEffect
  useEffect(() => {
    setRequesting(true);
    (async function () {
      const res = await brandApi.fetchBrands();
      setList(res.data);
      setData(res.data);
      formatCSV(res);
      console.log(res.data);
      setRequesting(false);
    })();
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
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const requestTimeout = () => {
    setTimeout(() => {
      setRequesting(false)
    }, 10000);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - LIST.length) : 0;

  const filteredUsers = applySortFilter(LIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const formatCSV = (list) => {

    const csvData = [
      [``],
    ];
    /* eslint-disable-next-line no-plusplus */
    for (let i = 0; i < list.length; i++) {
      const tmp = list[i];
      csvData.push([``])
    }
    setCSV(csvData);
  }
  const closeModal = () => {
    setOpen(!open)
  };
  const editClose = () => setEditOpen(!editClose)

  const epoch = Math.round(Date.now() / 1000);
  const handleDelete = async (rowId) => {
    try {

      const res = await window.api.deleteBrand({ id: rowId });
      if (res) {
        const index = LIST.findIndex((arr) => arr.id);
        const _index = LIST.indexOf(rowId);

      }
    } catch (error) {
      alert('Something went wrong !')
    }
  }


  const handleFilter = async (data) => {
    try {
      const res = await brandApi.filterTurnaround(data);
      if (res) {
        setData(res);
        setList(res);
        setCSV(res);
      }

    } catch (error) {
      alert('Something went wrong !')
    }
    setOpen(false)
  }

  const close = () => {
    setPdtOpen(false);
  }

  const handleEdit = (id) => {
    console.log(id)
    const s = LIST.filter(f => f.id === id)[0];
    setSelRow(s)
    setEditOpen(true)
  }

  return (
    <Page title="Brands">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Brands
          </Typography>
          {/* <Button variant="contained" onClick={()=>setOpen(!open)} startIcon={<Iconify icon="eva:funnel-fill" />}>
            Filter
          </Button> */}
          <ButtonGroup variant='contained'>
            <Button onClick={() => setOpen(!open)}>Filter</Button>
            <Button onClick={() => navigate('/dashboard/settings/add-brand')}>Add Brand</Button>

            <Button>
              <CSVLink data={csv} filename={`Report-${epoch}.csv`} style={{ color: 'inherit', textDecoration: 'none' }}>Export</CSVLink>
            </Button>
          </ButtonGroup>
        </Stack>

        <Modal open={open} onClose={closeModal}>
          <Box>
            <InventoryProductListFilterForm close={closeModal} handleFilterSubmit={handleFilter} />
          </Box>
        </Modal>

        <Modal open={editOpen} onClose={editClose}>
          <Box className='modalContent' sx={{ width: '27rem' }}>
            <EditBrandForm close={editClose} brand={selRow && selRow || {}} />
          </Box>
        </Modal>

        <Card>
          {requesting && <LinearProgress />}
          <InventoryToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={LIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  hasCheckbox
                />
                <TableBody>
                  {LIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, brandName, brandLogo, slug, description, createdAt } = row
                    const isItemSelected = selected.indexOf(brandName) !== -1;

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
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, brandName)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <img src={brandLogo} alt='brand logo' height={60} width={60} />

                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {brandName}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{description}</TableCell>

                        <TableCell align="left">{format(new Date(createdAt), 'dd/MM/yyyy')}</TableCell>
                        <TableCell align="right">
                          <TableMoreMenu rowId={id} handleDelete={handleDelete} edit={handleEdit} hasEdit />
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
