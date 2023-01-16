//
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Modal,
  Box,
  Button,
  Stack,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';

// component
import IconifyMaterialIcon from './IconifyMaterialIcon';
// ----------------------------------------------------------------------
TableMoreMenu.propTypes = {
  handleDelete: PropTypes.func,
  rowId: PropTypes.number,
};
export default function TableMoreMenu({view, rowId, hasEdit, hasView, handleDelete, edit }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const onDelete = () => {
    setIsOpen(false);
    return handleDelete(rowId);
  };

  const closeModal = (bool) => {
    setOpen(false);
  };

  const handleEdit = () => {
    setIsOpen(false);
    return edit(rowId);
  };

  const handleView =()=>{
    setIsOpen(false);
    return view(rowId)
  }

  const handleDeleteResult = () => {
    //  continue to delete
    return handleDelete(rowId);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon width={20} height={20} />
      </IconButton>

      <Modal open={open} onClose={closeModal}>
        <Box style={{ width: '15rem', backgroundColor: '#fff', padding: '1rem', height: '5rem', margin: 'auto' }}>
          <Typography variant="h3">Click continue to delete this item</Typography>
          <Stack direction="row" spacing={3}>
            <Button variant="contained" color="error" onClick={closeModal}>
              Continue
            </Button>
            <Button variant="outlined" color="default" onClick={handleDeleteResult}>
              Cancel
            </Button>
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
        {hasView && (
          <MenuItem component={RouterLink} onClick={handleView} to="#" sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <IconifyMaterialIcon icon={VisibilityIcon} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}

        {hasEdit && (
          <MenuItem component={RouterLink} onClick={handleEdit} to="#" sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <IconifyMaterialIcon icon={EditOutlined} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
        <MenuItem sx={{ color: 'text.secondary' }} onClick={onDelete}>
          <ListItemIcon>
            <IconifyMaterialIcon icon={DeleteOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
