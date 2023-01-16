import * as Yup from 'yup';
import { useState } from 'react';
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
//	styled component
const FormContainer=styled(Box)({
	width:'27rem',
	backgroundColor:'#fff',
	padding:'2rem',
	borderRadius:'.7rem',

})

export default function InventoryProductListFilterForm({close,handleFilterSubmit}) {
	const navigate = useNavigate()
	const FilterFormSchema = Yup.object().shape({
		brv: Yup.string(),
		operation: Yup.string(),
		depot: Yup.string(),
		capacity: Yup.string(),
		dateFrom:Yup.string(),
		dateTo:Yup.string()
	});

	const defaultValues = {
		brv: '',
		operation: '',
		depot: '',
		capacity:'',
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
						        	<Typography variant='h4' gutterBottom>Filter Form</Typography>
						        	<Box>
						        		<IconButton onClick={onClose}>&times;</IconButton>
						        	</Box>
						        </Box>
					        </Grid>
				        	<Grid item xs={12}>
				              <RHFTextField name="depot" label="Depot" select >
				              {
				              	['APD','Akosombo','Buipe','Bolga','Kumasi'].map((d,index)=>(
				              			<MenuItem key={index} value={d}>{d}</MenuItem>
				              		))
				              }
				              
				              </RHFTextField>
				        	</Grid>

					        <Grid item xs={8}>
					          <RHFTextField name="operation" label="Operation Type" select>
					          	{
					          		['Loading','Discharge'].map((operation,index)=>(
					          			<MenuItem key={index} value={operation}>{operation}</MenuItem>
					          		))
					          	}
					          </RHFTextField>
					        </Grid>
					         <Grid item xs={4}>
					         	 <RHFTextField name="capacity" label="Capacity" />
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
					        <Grid container item direction='row' spacing={2} xs={12}>
					         <Grid item xs={8}>
								 <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
						          Filter
						        </LoadingButton>
				             </Grid>
				             <Grid item xs={4}>
						         <LoadingButton fullWidth size="large" variant='outlined' color='error'>Cancel</LoadingButton>
				             </Grid>
				             </Grid>
				        </Grid>
				     
				     </Box>
				</FormProvider>
			</FormContainer>
		</Box>
	)
}