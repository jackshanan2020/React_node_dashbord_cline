import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect,useRef } from 'react';
import { Link as RouterLink ,useNavigate} from 'react-router-dom';
import { CSVLink, CSVDownload } from 'react-csv';
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
  LinearProgress,
  ButtonGroup,
  Box ,
  Paper,
  styled,
  IconButton,
  Grid
} from '@mui/material';
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { InventoryHead, InventoryToolbar, InventoryMoreMenu,InventoryCreateForm,InventoryEditForm } from '../sections/@dashboard/inventory';
import InventoryProductListFilterForm from '../sections/@dashboard/inventory/InventoryProductListFilterForm';
import TableMoreMenu from '../components/TableMoreMenu';
// mock
import products from '../_mock/inventory.products';
// api
import inventoryApi from '../apis/inventoryApi';

import {discountCalculator} from '../utils/discountCalculator';
import {fCurrency} from '../utils/formatNumber';
// ----------------------------------------------------------------------

const TABLE_HEAD =[
 { id: 'name', label: 'Name', alignRight: false },
 { id: 'sku', label: 'SKU', alignRight: false },
 { id: 'brand', label: 'Brand', alignRight: false },
 { id: 'price', label: 'Price', alignRight: false },
 { id: 'quantity', label: 'Quantity', alignRight: false },
 { id: 'unit', label: 'Unit', alignRight: false },
 { id: 'availability', label: 'Availability', alignRight: false },
 { id: 'createdOn', label: 'Created on', alignRight: false },

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

export default function Inventory() {
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

  const [pdtOpen, setPdtOpen]=useState(false);

  const [editOpen,setEditOpen]=useState(false);

  const [pdtPurOpen,setPdtPurOpen]=useState(false);

  const [selectedRow,setSelectedRow]= useState(null)
 
  const [viewItem, setViewItem] = useState(false)
  // useEffect
  useEffect(()=>{
    setRequesting(true);
      (async function(){
        const res = await inventoryApi.getAllInventory();
        setList(res.data.products); 
        setData(res.data.products);
        console.log(res.data.products)
        formatCSV(res);
        setRequesting(false);
      })();
      requestTimeout();
      return () => {};
  },[]);
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

  const requestTimeout=()=>{
    setTimeout(()=> {
      setRequesting(false)
    }, 10000);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - LIST.length) : 0;

  const filteredUsers = applySortFilter(LIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  
  const formatCSV=(list)=>{
   
    const csvData =[]
      
    /* eslint-disable-next-line no-plusplus */
    for (let i = 0; i < list.length; i++ ) {
      const tmp = list[i];
      csvData.push([])
    }
    setCSV(csvData);
  }
  const closeModal=()=>{
    setOpen(!open)
  };
const editClose=()=>setEditOpen(!editClose)

const pdtClose=()=>setPdtOpen(!pdtOpen);

const pdtPurClose=()=>setPdtPurOpen(!pdtPurOpen);
  
 const epoch = Math.round(Date.now() / 1000);
  const handleDelete =async(rowId)=>{
    console.log(rowId, 'delete')
    try{
   
      const res = await window.api.deleteProduct({id:rowId});
      if(res){
        const index = LIST.findIndex((arr)=>arr.id);
        const _index =LIST.indexOf(rowId);
      
      }
    }catch(error){
      alert('Something went wrong !')
    }
  }

 function timeConvert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} h ${minutes} m`;
  }

 const handleFilter =async(_data)=>{
    try{
      const res = await inventoryApi.filterTurnaround(_data);
      if(res){
        setData(res.data);
        setList(res.data);
        setCSV(res.data);
      }

    }catch(error){
      alert('Something went wrong !')
    }
    setOpen(false)
  }

  const close=()=>{
    setPdtPurOpen(false);
    setPdtOpen(false);
  }

  const handleEdit=(param)=>{
    const row = data.filter(f=>f.id === param)[0];
    setSelectedRow(row)
    setEditOpen(!editOpen)
  }

  // view product details
  const handleViewItem=(param)=>{
    if(!viewItem){
    const row = data.filter(f=>f.id === param)[0];
    setSelectedRow(row)
    setViewItem(true)
    }
  }

  return (
    <Page title="Products">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
         {/* <Button variant="contained" onClick={()=>setOpen(!open)} startIcon={<Iconify icon="eva:funnel-fill" />}>
            Filter
          </Button> */}
          <ButtonGroup variant='contained'>
            <Button onClick={()=>setOpen(!open)}>Filter</Button>
            <Button onClick={()=>setPdtOpen(!pdtOpen)}>Add Product</Button>
            <Button onClick={()=>navigate('/dashboard/product/purchases')}>  
            Purchases
            </Button>
            <Button>
              <CSVLink data={csv} filename={`Report-${epoch}.csv`} style={{color:'inherit',textDecoration:'none'}}>Export</CSVLink> 
            </Button>
          </ButtonGroup>
        </Stack>

       <Modal open={open} onClose={closeModal}>
          <InventoryProductListFilterForm close={closeModal} handleFilterSubmit={handleFilter}/>
       </Modal>
       {/* Add new product modal */}
       <Modal open={pdtOpen} onClose={pdtClose}>
          <InventoryCreateForm close={pdtClose}/>
       </Modal>
       {/* Edit product modal */}
       <Modal open={editOpen} onClose={editClose}>
          <Box>
            <InventoryEditForm close={editClose} item={selectedRow}/>
          </Box>
       </Modal>
       <Modal open={viewItem} onClose={()=>setViewItem(!viewItem)}>
         <Box>
           <ViewProductDetails product={selectedRow} close={()=>setViewItem(!viewItem) }/>
         </Box>
       </Modal>
   
        <Card>
        {requesting&& <LinearProgress/>}
          <InventoryToolbar
           numSelected={selected.length}
           filterName={filterName}
           onFilterName={handleFilterByName} 
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <InventoryHead
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
                    const { id,name, date,createdAt,title,brand,price,quantity,unit,sku,availability} = row;
                    
                    const isItemSelected = selected.indexOf(name) !== -1;

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
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell align="left">{sku}</TableCell>
                        <TableCell align="left">{brand}</TableCell>
                        <TableCell align="left">{price}</TableCell>
                        <TableCell align="left">{quantity}</TableCell>
                        <TableCell align="left">{unit}</TableCell>
                        <TableCell align="left">{availability}</TableCell>
                        <TableCell align="left">{format(new Date(createdAt), 'dd/MM/yyyy')}</TableCell>
                        <TableCell align="right">
                          <TableMoreMenu rowId={id} view={handleViewItem} handleDelete={handleDelete} edit={handleEdit} hasView hasEdit />
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

const ItemDetailPaper = styled(Paper)({
  width:'50rem',
  margin:'auto',
  padding:'1.5rem',
  marginTop:'3rem',
  height:'80vh'
});

const ItemGalleryBox= styled(Box)({
  minHeight:'20rem',
  width:'100%',
  border:'1px solid #ddd'
});
const ItemImage = styled(Box)({
  width:'100%',

})

function ViewProductDetails({product}){
  const ref= useRef();

  const {
    name,
    price,
    discount,
    shortDescription,
    brand,
    availability,
    sku,
    longDescription,
    createdAt,
    status,
    badge,
    rating,
    productGallery
  } = product;

  console.log(product)
  return(
    <>
   
      <ItemDetailPaper>
       <Scrollbar>
        <Box>
          
          <Grid container spacing={3}>
          <Grid item xs={12}>
              <Typography variant='h5'>{sentenceCase(name)}</Typography>
          </Grid>
            <Grid item lg={8} md={8} sm={8} xs={12}>
              <ItemGalleryBox>
                <Typography sx={{float:'right',margin:1}}>
                  <Label variant='filled' 
                    color={
                      (status === 'new' && 'success') ||
                      (status === 'pending' && 'info') ||
                      (status === 'out of stock' && 'error') ||
                      'default'
                            }
                  >
                    {status}
                  </Label>
                </Typography>
                  {
                    [].map((imageSrc,index)=>{

                      return (
                          <Box key={index} component='img' src={imageSrc} alt={name}/>
                        )
                    })
                  }
               <ItemImage ref={ref} component='img' src={productGallery&&JSON.parse(productGallery)[0]} alt={name}/>
              
              </ItemGalleryBox>
              <Box sx={{mt:2}}>
                <ButtonGroup variant='contained' size='small'>
                  <Button>
                     <KeyboardArrowLeft fontSize="medium" style={{ cursor: "pointer" }} />
                  </Button>
                  <Button>
                      <KeyboardArrowRight fontSize="medium" style={{ cursor: "pointer" }} />
                  </Button>
                </ButtonGroup>
              </Box>
           
            </Grid>

            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Box sx={{display:'flex',gap:2}}>
              <Typography sx={{color:'#aaa',fontSize:'1.3rem',fontWeight:'lighter'}}>
                <strike>$ {fCurrency(price)}</strike>
                </Typography >
                <Typography sx={{fontSize:'1.3rem',fontWeight:100}}> $ {fCurrency(discountCalculator(discount,price))}</Typography>
              </Box>

                
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>{shortDescription}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{longDescription}</Typography>
              <div />
            </Grid>
            
          </Grid>
        </Box>
        </Scrollbar>
      </ItemDetailPaper>
      

    </>
    )
}