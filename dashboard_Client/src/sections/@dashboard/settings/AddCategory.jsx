import * as Yup from 'yup';
import {sentenceCase} from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack,Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// apis


// ----------------------------------------------------------------------

export default function AddCategoryForm() {
  const navigate = useNavigate();


  const RegisterSchema = Yup.object().shape({
    
  });

  const defaultValues = {
  
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (newData) => {

    const send = await window.api.createCategory(newData)
    if(send){
      alert('category created !')
    }else{
      alert('Failed to create category')
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={3} sx={{ width: '25rem' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Typography>Add Category</Typography>

        </Stack>
        <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
          <RHFTextField  name="name" label="Name" size='small' />

          <RHFTextField name="code" label="Code" size='small' />
          <RHFTextField type='file' name="attachment" size='small' />
        </Stack>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          Save
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
