import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {format} from 'date-fns';
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
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  LinearProgress
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import UserMoreMenu from '../sections/@dashboard/user/UserMoreMenu'
//  api
import userApi from '../apis/userApi';
// mock
import _USERLIST from '../_mock/user';
import {useAuth} from '../hooks/useAuth';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'userName', label: 'Username', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
{ id: 'createdOn', label: 'Created on', alignRight: false },
]
// ----------------------------------------------------------------------

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
    return filter(array, (_user) => _user.userName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const currentUser = useAuth()?.user;

  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [USERLIST,setUserList] = useState([]);

  const [selectToDelete, setSelectToDelete] = useState('');

  const [open,setOpen] =useState(false);

  const [requesting,setRequesting]=useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  //  useEffect hook 
  useEffect(()=>{
    
   (
      async function(){
        setRequesting(true);
        const newUserList = await window.api.getAllUsers();
          // setUserList([]);
          setRequesting(false);
          if (newUserList) {
            setUserList(newUserList);
            console.log(newUserList)
          }
          console.log(newUserList)
      })(); 
      requestTimeout();
    return ()=>{};
  },[]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.userName);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleEdit=(rowId)=>{
    const sel = USERLIST.filter((u)=>u.id===rowId)
     setSelectedUser(sel);
     navigate('../user/edit-user',{replace:true,state:sel[0]});
  };

  const handleDelete=(rowId)=>{
    setSelectToDelete(rowId);
    //  setOpen(true);
    handleClickOpen();
  };

   const handleDeleteResult=async()=>{
    //  continue to delete
    setRequesting(true)
    try{
      const res =await window.api.deleteAccount({id:selectToDelete});
      
      if(res){
        const oldUserList=USERLIST;
        const index =oldUserList.findIndex((l)=>l.id===selectToDelete)
        oldUserList.splice(index, 1);
        setUserList(oldUserList);
      }
    }catch(error){
        alert('Something went wrong');
    }
    setRequesting(false)
    handleClose();
  }


    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
 const requestTimeout=()=>{
    setTimeout(()=> {
      setRequesting(false)
    }, 10000);
  }


  return (
    <Page title="User">
      <Container>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/user/create-user" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
     { !requesting&&
      <>
      <DialogTitle id="alert-dialog-title">
          {"Delete this item?"}
      </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {currentUser&&currentUser.id=== selectToDelete?
             <Typography>
                You are currently logged in with this account, do you want to delete anyway ?
            </Typography>
              :
            <Typography>
                Click continue to delete this item, this action cannot be undone
            </Typography>
           
             }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteResult}>Continue</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
        </>}
        {
        requesting&&
          <DialogContent> 
            <CircularProgress/>
         </DialogContent>}

      </Dialog>
      

      {/* <Modal open={open} onClose={closeModal}>
      <Box style={{width:'15rem',backgroundColor:'#fff',padding:'1rem',height:'5rem',margin:'auto'}}>
       <Typography variant='h3'>Click continue to delete this item</Typography>
        <Stack direction='row' spacing={3}>
            <Button variant='contained' color='error' onClick={closeModal}>Continue</Button>
            <Button variant='outlined' color='default' onClick={handleDeleteResult}>Cancel</Button>
        </Stack>
      </Box>
      </Modal> */}

        <Card>
       {requesting&& <LinearProgress/>}
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                   
                   const { id,userName, role,firstName,lastName, isVerified,status ,createdOn} = row;
                   const  name = `${firstName} ${lastName}`;
                   const isItemSelected = selected.indexOf(userName) !== -1;

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
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, userName)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={''} />
                            <Typography variant="subtitle2" noWrap>
                              {sentenceCase(name)}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{userName}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                         <TableCell align="left">
                          <Label variant="ghost" color={(status === 'inactive' && 'error') || 'success'}>
                            {status}
                          </Label>
                        </TableCell>

                        <TableCell align="left">{format(new Date(createdOn), 'dd/MM/yyyy')}</TableCell>
                      

                        <TableCell align="right">
                          <UserMoreMenu rowId={id} handleEdit={handleEdit} handleDelete={handleDelete}/>
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
            count={USERLIST.length}
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
