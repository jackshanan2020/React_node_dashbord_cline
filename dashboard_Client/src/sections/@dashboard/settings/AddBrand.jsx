import * as Yup from 'yup';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack,Typography,Box,IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Close from '@mui/icons-material/Close';

// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// apis


// ----------------------------------------------------------------------

export default function AddBrandForm() {
  const navigate = useNavigate();

  const [file,setFile] = useState(null);

  const RegisterSchema = Yup.object().shape({
    name:Yup.string().required('Brand name is required'),
    details:Yup.string().notRequired(),

  });

  const defaultValues = {
    brandName:'',
    description:'',
    brandLogo:'',
    slug:''
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
    console.log(newData)
    const send = await window.api.createBrand(newData);
    if(send){
      alert('Brand created successfully !')
    }else{
      alert('Could not add brand')
    }
  };

  const handleFileChooser = (e) => {
    const _file = e.target.files[0];
    if(_file){
      setFile(_file );
    }
   
   
  }
  const deleteFile=()=>{
    setFile(null)
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: '25rem' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Typography>Add Brand</Typography>

        </Stack>
        <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
          <RHFTextField name="brandName" label="Name" size='small' />

          <RHFTextField name="slug" label="Slug" size='small' />
          <RHFTextField name="description" rows={3} label="Description" multiline size='small' />
          <RHFTextField type='file' name="brandLogo" size='small' onChange={handleFileChooser}/>
        </Stack>
        <Box>
    {
      file !==null&&
      <Box
      sx={{display:'flex',flexDirection:'column',m:1,alignItems:'flex-start'}}>
      <IconButton sx={{mb:-5,mr:.5,backgroundColor:'#fff'}} onClick={deleteFile}>
        <Close fontSize='small'/></IconButton>
        <img 
        src={URL.createObjectURL(file)} 
        alt={''} 
        height='200px' 
        width={200} 
        style={{objectFit:'cover'}}/>
        </Box>
    }
        </Box>
        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
          Save
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
