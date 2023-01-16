import { Link as RouterLink } from 'react-router-dom';
import {PropTypes} from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import EditUserForm from '../sections/auth/EditUserForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
EditUser.propTypes={
  user: PropTypes.object
}
//  ------------------------------------------------------------------------

export default function EditUser({user}) {
  const smUp = useResponsive('up', 'sm');

  return (
    <Page title="Edit">
      <RootStyle>
       
        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Update a user account
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Edit user account or reset a password
            </Typography>

            <EditUserForm user={user}/>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link variant="subtitle2" to="/login" component={RouterLink}>
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
