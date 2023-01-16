import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText,Modal,Stack,Button ,Box,Typography} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------
UserMoreMenu.propTypes={
  rowId: PropTypes.any,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func
}
export default function UserMoreMenu({rowId,handleDelete, handleEdit}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const onDelete=()=>{
   setIsOpen(!isOpen)
   return handleDelete(rowId)
      
  }

  const onEdit=()=>{
    setIsOpen(false)
    return handleEdit(rowId)
  }
  const closeModal=(bool)=>{
    setIsOpen(false)
  }


  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
       <MoreVertIcon width={20} height={20} />
      </IconButton>

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
        <MenuItem sx={{ color: 'text.secondary' }} component={RouterLink} to="#" onClick={onDelete}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }} onClick={onEdit}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
