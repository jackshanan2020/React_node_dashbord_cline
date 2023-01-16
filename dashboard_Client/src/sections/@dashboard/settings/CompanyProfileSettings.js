import * as Yup from 'yup';
//	react
import { useState } from 'react';
//	mui
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutline';
import { Box, styled, Grid ,Card,CardContent,Typography,IconButton} from '@mui/material';
import { LoadingButton } from '@mui/lab';

//	form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// styled components
const UIWrapper = styled(Card)({
	width: '100%',
	minHight: '25rem',
	
});

const companyData={
		companyName: 'Company',
		companyAddress: 'address',
		companyLogo: '',
		companyEmail:'example@mail.com'
};
export default function CompanyProfileSettings() {

	const [tmpLogo,setTmpLogo]=useState(null);

	const Schema = Yup.object().shape({
		companyName: Yup.string(),
	});

	const defaultValues = {
		companyName: '',
		companyAddress: '',
		companyLogo: '',
		companyEmail:''
	};

	const methods = useForm({
		resolver: yupResolver(Schema),
		defaultValues,
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = (vals) => {
		console.log(vals)
	};

	const fileUploadHandler=(e)=>{
		const file = e.target.files;
		console.log(file);
		if(file){
			console.log(file[0].type, 'if block');
			// validate file types only image files
			const allowed = ['image/png','image/jpeg','image/jpg'];
			if(allowed.includes(file[0].type)){
				setTmpLogo({image:file[0]});
			}else{
				alert('Sorry file selected is not allowed \n select a png jpg or jpeg file');
			}
		}else{
			console.log(file, 'else block');

		}
	}

	return (
		<UIWrapper>
		<CardContent>
		<Grid container style={{display:'flex',flexDirection:'row'}} spacing={3}>
			<Grid item xs={6}>
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2} justifyContent='space-between'>
					<Grid item xs={12} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
						<RHFTextField name="companyLogo" id="companyLogo" type="file" onChange={fileUploadHandler} style={{display:'none'}}/>
						
						<Box component='label'  htmlFor='companyLogo' sx={{textAlign:'center'}}>
							<Box color='info' component={CloudUploadOutlinedIcon} sx={{fontSize:'4rem'}}/>
							<Typography>Upload company logo</Typography>
						</Box>

					</Grid>
						<Grid item xs={12}>
							<RHFTextField name="companyName" InputLabelProps={{shrink:true}} type="text" label="Company Name" />
						</Grid>
						<Grid item xs={12}>
							<RHFTextField name="companyAddress" InputLabelProps={{shrink:true}} type="text" label="Company Address" />
						</Grid>
						<Grid item xs={12}>
							<RHFTextField name="companyEmail"  InputLabelProps={{shrink:true}}type="email" label="Company Email" />
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<LoadingButton sx={{mt:2}} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>Save</LoadingButton>
					</Grid>
				</FormProvider>
			</Grid>
			<Grid item xs={6}>
			<Box sx={{height:'10rem',width:'100%'}}>
			{tmpLogo&&<Box component='img' src={URL.createObjectURL(tmpLogo?.image)} sx={{height:150,width:150}}/>}

			</Box>
			<Box style={{lineHieght:1.5,borderRadius:'1rem',padding:'1rem',marginLeft:'1rem',border:'1px solid #ddd'}}>
				<Typography variant='h5'>{companyData.companyName}</Typography>
				<Typography variant='body2'>{companyData.companyAddress}</Typography>
				<Typography variant='body2'>{companyData.companyEmail}</Typography>
				<Box sx={{mt:'2rem'}}>
					<IconButton variant='outlined'>
						<EditOutlinedIcon/>
					</IconButton>
					<IconButton>
						<DeleteOutlinedIcon/>
					</IconButton>
				</Box>
			</Box>
			</Grid>
		</Grid>
			</CardContent>
		</UIWrapper>
	);
}
