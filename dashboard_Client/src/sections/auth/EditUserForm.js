import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment ,MenuItem,Divider,Grid} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';
// apis

// ----------------------------------------------------------------------

export default function EditUserForm({user}) {
  const navigate = useNavigate();

  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    userName:Yup.string().required('Username required'),
    role:Yup.string().required('Role is required'),
  });
  const {id,firstName,lastName,email,status,role,userName} = location?.state;
  const defaultValues = {
    firstName,
    lastName,
    userName,
    role,
    status
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
    newUser.id=id;
    const update = await window.api.updateAccount(newUser);
    if(update){
      navigate('/dashboard/user', { replace: true });
    }
   }catch(error){
      alert("Could not update user detail")
   }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
          <RHFTextField name="userName" label="User name" />

        </Stack>

         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          
          <RHFTextField name="role" label="Role" select>
             {
              ['admin','user','accountant'].map((role,index)=>(
                  <MenuItem key={index} value={role}>{role}</MenuItem>
                ))
            }
          </RHFTextField>
    
          <RHFTextField name="status" label="Status" select>
             {
              ['active','banned','inactive'].map((status,index)=>(
                  <MenuItem key={index} value={status}>{status}</MenuItem>
                ))
            }
          </RHFTextField>

        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Save changes
        </LoadingButton>
        <Divider/>
     
      </Stack>
    </FormProvider>
  );
}
