import * as Yup from 'yup';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Stack, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// apis


// ----------------------------------------------------------------------

export default function AddCustomerForm() {

  const navigate = useNavigate();

  const Schema = Yup.object().shape({
    name:Yup.string().required('Customer name is required'),
    email:Yup.string().email('Please enter a valid email').notRequired(),
    city:Yup.string().notRequired(),
    country:Yup.string().notRequired()
  });

  const defaultValues = {
     name:'jon doe',
     address:'13th street',
     email:'jon@gmail.com',
     city:'accra',
     phone:'0213456789',
     country:'Ghana',
     attachment:''
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
    const send = await window.api.createCustomer(newData);
    if(send){
      alert('Row created successfully');
    }else{
      alert('Failed to create row')
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: '50rem' }}>


        <Stack sx={{ mb: 5 }} spacing={2}>
          <Typography variant='h6'>Add Customer</Typography>
        </Stack>

        <Stack spacing={3} sx={{ width: '50rem' }} direction={{ xs: 'column', sm: 'row' }}>

          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
              <RHFTextField InputLabelProps={{ shrink: true }} name="name" label="Name" size='large' />
              <RHFTextField InputLabelProps={{ shrink: true }} name="phone" label="Phone" size='large' />
              <RHFTextField InputLabelProps={{ shrink: true }} name="email" label="Email" size='large' />
              <RHFTextField type='file' name="attachment" size='large' />

            </Stack>
          </Stack>

          <Stack spacing={2}>
            <RHFTextField InputLabelProps={{ shrink: true }} name="city" label="City" size='large' />
            <RHFTextField InputLabelProps={{ shrink: true }} name="country" label="Country" size='large' />
            <RHFTextField InputLabelProps={{ shrink: true }} name="address" label="Address" size='large' />
            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
          </Stack>

        </Stack>
       
      </Box>
    </FormProvider>
  );
}
