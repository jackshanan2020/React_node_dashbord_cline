import * as Yup from 'yup';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Typography, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import {fDate} from '../../../utils/formatTime';

// ----------------------------------------------------------------------

export default function AddExpensesForm() {
  const navigate = useNavigate();


  const Schema = Yup.object().shape({
    title: Yup.string().required('Expense title is required'),
    date: Yup.string().required(),
    amount: Yup.number().required(),
    category: Yup.string().required(),
    details: Yup.string().notRequired(),
  });

  const defaultValues = {
    date: fDate(new Date()),
    account: 'acc 00000123',
    title: 'Purchase of items',
    amount: 4000,
    reference: 'ref 200',
    category: 'test category',
    details: 'lorem ipsum dolor sit ametr',
    attachment: ''
  };

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async(newData) => {
   
    console.log(newData, 'submit')
    const save = await window.api.createExpenses(newData)
   if(save){
    console.log('saved expenses')
   }else{
    console.log('failed')
   }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: 'auto' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Typography>Add Expenses</Typography>

        </Stack>
        <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
          <Grid container direction='row' spacing={3}>

            <Grid item xs={6}>
              <RHFTextField type='date' name="date" InputLabelProps={{ shrink: true }} label="Date" size='large' />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="title" label="Title" size='large' />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="account" label="Account" size='large' />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="amount" label="Amount" size='large' />

            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="reference" label="Reference" size='large' />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="category" label="Category" size='large' />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField type='file' name="attachment" size='large' />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="details" rows={3} label="Details" multiline size='large' />
            </Grid>
          </Grid>
        </Stack>
        <LoadingButton type="submit" sx={{width:200}} variant="contained" size="large" loading={isSubmitting}>
          Save
        </LoadingButton>

      </Stack>
    </FormProvider>
  );
}
