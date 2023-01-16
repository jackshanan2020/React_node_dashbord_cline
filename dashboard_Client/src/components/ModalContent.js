import React from 'react';
import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
//---------------------------------------------

const RootStyle = styled(Box)(() => ({
    flexGrow: 1,
    overflow: 'hidden',
    width: '25rem',
    borderRadius: '.7rem',
    padding: '2rem',
    margin: 'auto',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'5rem'
}));

ModalContent.propTypes = {
    sx: PropTypes.object,
    children: PropTypes.node
}
export default function ModalContent({ children, sx, ...other }) {
    return (
        <RootStyle sx={{

            ...sx
        }}>
            {children}
        </RootStyle>
    )
}
