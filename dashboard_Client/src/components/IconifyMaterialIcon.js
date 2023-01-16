import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

IconifyMaterialIcon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
};

export default function IconifyMaterialIcon({ icon, sx, ...other }) {
  return <Box component={icon} sx={{ ...sx }} {...other} />;
}
