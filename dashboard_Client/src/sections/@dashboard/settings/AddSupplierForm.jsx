import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Stack, IconButton, InputAdornment, Box, Grid, styled, MenuItem, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// components
import Iconify from '../../../components/Iconify';

//  styled component
const FormContainer = styled(Box)({
  width: '27rem',
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '.7rem',
});
export default function AddSupplierForm({ close }) {
  const [supId, setSupId] = useState('');

  useEffect(() => {
    (async function () {
      const idGen = await window.api.generateSupplierId();
      if (idGen&&idGen.length >0) {
        if(idGen[0].supplierId){
            const last =idGen[0].supplierId.split('-')[1];
            const _id = `PJ-${parseInt(last,10)+1}`
            setSupId(_id);
        }
      }
     
       })();
  }, []);

  const Schema = Yup.object().shape({
    name: Yup.string().required('Supplier name is required'),
    address: Yup.string().notRequired(),
    phone: Yup.string().notRequired(),
    email: Yup.string().email('Please enter a valid email').notRequired(),
  });

  const defaultValues = {
    supplierId: supId,
    name: 'Bentley inc',
    address: 'address 125 - 009',
    phone: '002255455',
    email: 'bentley@gmail.com',
    website: 'www.bentley.com',
    country: 'Ghana',
    city: 'Accra',
  };

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (newData) => {
   newData.supplierId = supId;
    const post = await window.api.createSupplier(newData);
    if (post) {
      alert('Operation successfully');
    } else {
      alert('Operation failed');
    }
  };
  // supplierId, name,address,phone,email,
  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormContainer>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Box style={{ display: 'flex', flexDirection: 'flex-end' }}>
              <IconButton onClick={close}>
                <Typography variant="h5"> &times; </Typography>
              </IconButton>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4">Add Supplier</Typography>
              </Grid>
              <Grid item xs={4}>
                <RHFTextField name="supplierId" label="Supplier Id" value={supId} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={8}>
                <RHFTextField name="name" label="Supplier name" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField name="address" label="Address" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField name="phone" label="Phone" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField name="email" label="Email" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField name="website" label="Website" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField name="country" label="Country" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField name="city" label="City" InputLabelProps={{ shrink: true }} />
              </Grid>

              <Grid item xs={12}>
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Add
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </FormContainer>
    </Box>
  );
}
