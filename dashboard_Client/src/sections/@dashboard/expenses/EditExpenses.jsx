import * as Yup from 'yup';
import { sentenceCase } from 'change-case';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Typography, Grid, styled,Button, Container, IconButton, Box, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Close from '@mui/icons-material/Close';
import { CloudUpload } from '@mui/icons-material';
import FilePresentOutlined from '@mui/icons-material/FilePresentOutlined';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { fDate } from '../../../utils/formatTime';
import Scrollbar from '../../../components/Scrollbar';

// ----------------------------------------------------------------------
const FromWrapper = styled(Container)({
  backgroundColor: '#fff',
  width: '50rem',
  padding: '2rem',
  marginTop: '1rem',
  overflow:'hidden',
  height:'90vh'
})

const AttachmentLabel = styled(Box)(({theme}) => ({
  height: '5rem',
  width: '7rem',
  border: `2px dashed ${theme.palette.primary.main}`,
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  margin:'auto',
  borderRadius:10,
  marginBottom:'2rem',

}))
EditExpensesForm.propTypes = {
  expense: PropTypes.object
}

export default function EditExpensesForm({ expense, close }) {
  const navigate = useNavigate();

  const {id,date,title,amount,account,reference,category,details} = expense;

  const [attachment,setAttachment]=useState(null);

  const Schema = Yup.object().shape({
    title: Yup.string().required('Expense title is required'),
    date: Yup.string().required(),
    amount: Yup.number().required(),
    category: Yup.string().required(),
    details: Yup.string().notRequired(),
  });

  const defaultValues = {
    date,
    account,
    title,
    amount,
    reference,
    category,
    details,
   
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
    console.log(newData, 'submit')
    newData.id=id;
    const save = await window.api.updateExpenses(newData)
    if (save) {
      console.log('saved expenses')
    } else {
      console.log('failed')
    }
  };

  const handleFileChooser=(e)=>{
    const file = e.target.files[0];
    const extensions = ['image/jpeg','image/png','image/jpg','application.pdf','application.docx','application.xlsx','csv']
    console.log(file,file.type)
    if(file){
      setAttachment({file,type:file.type})
    }
   
  }

  return (
    <FromWrapper>
        <Scrollbar>
      <IconButton sx={{ mb: 5 }} onClick={close}>
        <Close />
      </IconButton>
    
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ width: 'auto', mb: '2rem' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Typography variant='h5'>Edit Expenses</Typography>

          </Stack>
          <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
            <Grid container direction='row' spacing={3}>

              <Grid item xs={12}>
                <AttachmentLabel>
                  <input type='file' style={{ display: 'none' }} name="attachment" id='attachment' onChange={handleFileChooser}/>
                  <Box style={{ width: '100%', textAlign: 'center', pointer: 'cursor' }} component='label' htmlFor='attachment' id='attachmentlbl'>

                    <CloudUpload fontSize='large'/>
                    
                  </Box>

                </AttachmentLabel>
                {attachment!== null && 
                <Box>
                  {attachment.type.split('/')[0]==='image' ? <img alt='attachment' src={URL.createObjectURL(attachment.file)}/>:<Box><FilePresentOutlined sx={{fontSize:'5rem'}}/> {attachment.file.name}</Box>}
                  
                </Box>}
              {attachment!==null&&<Button sx={{mb:5,mt:5}} variant='outlined' size='large'>Save attachment</Button>}
                <Divider/>
              </Grid>


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
                <RHFTextField name="details" rows={3} label="Details" multiline size='large' />
              </Grid>
            </Grid>
          </Stack>
          <LoadingButton type="submit" sx={{ width: 200 }} variant="contained" size="large" loading={isSubmitting}>
            Save changes
          </LoadingButton>

        </Stack>
      </FormProvider>
      </Scrollbar>
    </FromWrapper>
  );
}
