import * as Yup from 'yup';
import {sentenceCase} from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment ,MenuItem} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// apis
import userApi from '../../../apis/userApi';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    password: Yup.string().required('Password is required'),
    userName:Yup.string().required('Username required'),
    role:Yup.string().required('Role is required'),

  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    userName:'',
    password: '',
    role:''
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (newUser) => {
    console.log(newUser)
   try{
    const create = await window.api.register(newUser);
    if(create){
      navigate('/dashboard/user', { replace: true });
    }
   }catch(error){
      alert("Could not create a new user")
   }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
          <RHFTextField name="userName" label="Username" />

        </Stack>


        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          
          <RHFTextField name="role" label="Role" select>
             {
              ['admin','accountant'].map((role,index)=>(
                  <MenuItem key={index} value={role}>{sentenceCase(role)}</MenuItem>
                ))
            }
          </RHFTextField>

        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Create
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
