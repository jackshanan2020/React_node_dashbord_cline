// 
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText,Typography,Modal,Box,Button,Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutline from '@mui/icons-material/DeleteOutline';

// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------
OrderMoreMenu.propTypes={
  handleDelete: PropTypes.func,
  rowId: PropTypes.any
}
export default function OrderMoreMenu({rowId, handleDelete,view}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const onDelete=()=>{
    setOpen(false)
  }

  const closeModal=(bool)=>{
    setOpen(false)
  }

   const handleDeleteResult=()=>{
    //  continue to delete
    return handleDelete(rowId);
  }
  const onView=()=>{
    return view(rowId);
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
          <MoreVertIcon width={20} height={20} />
      </IconButton>

      <Modal open={open} onClose={closeModal}>
      <Box style={{width:'15rem',backgroundColor:'#fff',padding:'1rem',height:'5rem',margin:'auto'}}>
       <Typography variant='h3'>Click continue to delete this item</Typography>
        <Stack direction='row' spacing={3}>
            <Button variant='contained' color='error' onClick={closeModal}>Continue</Button>
            <Button variant='outlined' color='default' onClick={handleDeleteResult}>Cancel</Button>
        </Stack>
      </Box>
      </Modal>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={onView} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <VisibilityIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {/* <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
        {/* <MenuItem sx={{ color: 'text.secondary' }} onClick={onDelete}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
      </Menu>
    </>
  );
}
