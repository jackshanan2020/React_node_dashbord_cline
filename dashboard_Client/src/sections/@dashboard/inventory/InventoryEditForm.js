//
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Stack, IconButton, InputAdornment, Box, Grid, styled, MenuItem, Typography,Button,Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Close from '@mui/icons-material/Close';
import { CloudUpload } from '@mui/icons-material';
import FilePresentOutlined from '@mui/icons-material/FilePresentOutlined';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';

//	styled component
const FormContainer = styled(Box)({
	width: '37rem',
	height:'90vh',
	overflow:'hidden',
	backgroundColor: '#fff',
	padding: '2rem',
	borderRadius: '.7rem',
});
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
export default function InventoryEditForm({ close, item }) {
	const { id, sku, title, brand, price, quantity, unit, name, availability, productCode, minStock, supplier } = item;
	
  const [attachment,setAttachment]=useState(null);


	const Schema = Yup.object().shape({
		sku: Yup.string(),
		brand: Yup.string(),
		price: Yup.number(),

		unit: Yup.string(),
		title: Yup.string(),
		availability: Yup.string(),
	});

	const defaultValues = {
		sku,
		brand,
		price,
		quantity,
		unit,
		title,
		availability,
		productCode,
		supplier,
		minStock,
	};

	const methods = useForm({
		resolver: yupResolver(Schema),
		defaultValues,
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmit = async (data) => {
		data.id = id;
		const update = await window.api.updateProduct(data);
		if (update) {
			console.log('update successful');
		} else {
			alert('Something went wrong !');
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
  const saveFile=async()=>{
  	const payload = attachment
  	const save = await window.api.addProductCover(payload);
  	if(save){
  		console.log('saved')
  	}else{
  		alert('Someething went wrong !')
  	}
  }


	return (
		<Box
			style={{
				width: '100%',
				height: 'auto',
				padding: '2rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow:'hidden'
			}}
		>
			<FormContainer>
			<Scrollbar>
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Box>
						<Box>
							<IconButton onClick={close}>
								 <Close/>
							</IconButton>
						</Box>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Typography variant="h4">Edit product detail</Typography>
							</Grid>

							<Grid item xs={12}>
								<AttachmentLabel>
									<input
										type="file"
										style={{ display: 'none' }}
										name="attachment"
										id="attachment"
										onChange={handleFileChooser}
									/>
									<Box
										style={{ width: '100%', textAlign: 'center', pointer: 'cursor' }}
										component="label"
										htmlFor="attachment"
										id="attachmentlbl"
									>
										<CloudUpload fontSize="large" />
									</Box>
								</AttachmentLabel>
								{attachment !== null && (
									<Box>
										{attachment.type.split('/')[0] === 'image' ? (
											<img alt="attachment" src={URL.createObjectURL(attachment.file)} />
										) : (
											<Box>
												<FilePresentOutlined sx={{ fontSize: '5rem' }} /> {attachment.file.name}
											</Box>
										)}
									</Box>
								)}
								{attachment !== null && (
									<Button sx={{ mb: 5, mt: 5 }} variant="outlined" size="large" onClick={saveFile}>
										Save attachment
									</Button>
								)}
								<Divider />
							</Grid>

							<Grid item xs={12}>
								<RHFTextField name="title" label="Title" InputLabelProps={{ shrink: true }} />
							</Grid>
							<Grid item xs={6}>
								<RHFTextField name="productCode" label="Product Code" InputLabelProps={{ shrink: true }} />
							</Grid>
							<Grid item xs={6}>
								<RHFTextField name="brand" label="Brand" InputLabelProps={{ shrink: true }} />
							</Grid>
							<Grid item xs={8}>
								<RHFTextField name="supplier" label="Supplier" InputLabelProps={{ shrink: true }} />
							</Grid>
							<Grid item xs={4}>
								<RHFTextField name="unit" label="Select unit" InputLabelProps={{ shrink: true }} select>
									{['Kg', 'litre', 'lb'].map((unit, index) => (
										<MenuItem key={index} value={unit}>
											{unit}
										</MenuItem>
									))}
								</RHFTextField>
							</Grid>
							<Grid item xs={6}>
								<RHFTextField name="minStock" label="Minimum Stock level alert" InputLabelProps={{ shrink: true }} />
							</Grid>
							<Grid item xs={6}>
								<RHFTextField name="price" label="Unit Price" InputLabelProps={{ shrink: true }} />
							</Grid>
							<Grid item xs={12}>
								<LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
									Save changes
								</LoadingButton>
							</Grid>
						</Grid>
					</Box>
				</FormProvider>
				</Scrollbar>
			</FormContainer>
		</Box>
	);
}
