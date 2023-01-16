import * as Yup from 'yup';
import { useState } from 'react';
import {sentenceCase} from 'change-case';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment,Box ,Grid, styled,MenuItem,Typography} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// mock

//	styled component
const FormContainer=styled(Box)({
	width:'27rem',
	backgroundColor:'#fff',
	padding:'2rem',
	borderRadius:'.7rem',

})

export default function OrderListFilter({close,handleFilterSubmit}) {
	const navigate = useNavigate()
	const FilterFormSchema = Yup.object().shape({
		status: Yup.string(),
		dateFrom:Yup.string(),
		dateTo:Yup.string()
	});

	const defaultValues = {
		status:'',
		dateFrom:'',
		dateTo:''
	};

	const methods = useForm({
		resolver: yupResolver(FilterFormSchema),
		defaultValues,
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async (data) => {
		//	navigate('/dashboard/turnaround', { replace: true });
		return handleFilterSubmit(data)
		
	};
	const onClose=()=>{return close()}
	return (
		<Box style={{
			width:'100%',
			height:'100%',
			padding:'2rem',
			display:'flex',
			justifyContent:'center',
			alignItems:'center'
			}}>
			<FormContainer>
				 <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
				     <Box>

				        <Grid container spacing={3} colSpacing={2}>
					        <Grid item xs={12}>
						        <Box style={{display:'flex',justifyContent:'space-between'}}>
						        	<Typography variant='h4' gutterBottom>Filter Purchases</Typography>
						        	<Box>
						        		<IconButton onClick={onClose}>&times;</IconButton>
						        	</Box>
						        </Box>
					        </Grid>
				        	
				   
					         <Grid item xs={6}>
					         	  <RHFTextField 
						         	  name="dateFrom" 
						         	  label="Start Date" 
						         	  type='date'
						         	  InputLabelProps={{ shrink: true }}
					         	  />
					         </Grid>
					        <Grid item xs={6}>
					          <RHFTextField name="dateTo"  InputLabelProps={{ shrink: true }} label="End Date" type='date'/>
					        </Grid>

					        <Grid item xs={12}>
				              <RHFTextField name="status" label="Status" select InputLabelProps={{ shrink: true }} >
				              {
				              	['pending','paid','canceled'].map((s,index)=>(
				              			<MenuItem key={index} value={s}>{sentenceCase(s)}</MenuItem>
				              		))
				              }
				              
				              </RHFTextField>
					        </Grid>
					        <Grid container item direction='row' spacing={2} xs={12}>
					         <Grid item xs={8}>
								 <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
						          Filter
						        </LoadingButton>
				             </Grid>
				             <Grid item xs={4}>
						         <LoadingButton fullWidth size="large" variant='outlined' onClick={close}color='error'>Cancel</LoadingButton>
				             </Grid>
				             </Grid>
				        </Grid>
				     
				     </Box>
				</FormProvider>
			</FormContainer>
		</Box>
	)
}