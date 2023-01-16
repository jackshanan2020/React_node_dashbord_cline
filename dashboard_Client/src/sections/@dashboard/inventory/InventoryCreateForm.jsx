import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sentenceCase } from 'change-case';
// @mui
import {
  Stack,
  IconButton,
  Modal,
  InputAdornment,
  Box,
  Grid,
  styled,
  MenuItem,
  Typography,
  FormLabel,
  TableRow,
  Divider,
  TableBody,
  Table,
  TableCell,
  TableHead,
  Button,
  Container,
  TableContainer,
  TextField,
  ButtonGroup,
  Stepper,
  Step,
  StepButton,
  Checkbox
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// components
import Iconify from '../../../components/Iconify';
import TableHeader from '../../../components/table/TableHeader';
import Scrollbar from '../../../components/Scrollbar';
//  styled component
const FormContainer = styled(Box)({
  width: '60rem',
  backgroundColor: '#fff',
  padding: '3rem',
  borderRadius: '.7rem',
});

const TABLE_HEAD = [
  { id: 'sku', label: 'SKU', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'dimensions', label: 'Dimensions', alignRight: false },
  { id: '' },
];

function buildVariantKey(a) {
  if (a) {
    return a.replace(/s/g, '').toLowerCase()
  }
  return a
}

const steps = ['General', 'Variation', 'Preview'];
//--------------------------------------------------------------------
export default function InventoryCreateForm({ close }) {
  const [open, setOpen] = useState(false);

  const [productVariants, setProductVariants] = useState([]);

  const [variantTableData, setVariantTableData] = useState({ tableHead: TABLE_HEAD, tableBody: [] });
  // for holding defined variants and tracking changes
  const [customVariants, setCustomVariants] = useState([]);

  const [activeStep, setActiveStep] = useState(1);

  const [completed, setCompleted] = useState({});

  const [addVariation, setAddVariation] = useState(false);

  const [files, setFile] = useState([]);

  const Schema = Yup.object().shape({
    sku: Yup.string(),
  });

  const defaultValues = {
    sku: '',
    badge: 'New',
  };

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (newProduct) => {
    console.log(newProduct)
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleStepComplete = () => {

    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    console.log(newActiveStep)

    setActiveStep(newActiveStep);
  };


  const onAddVariants = (variants) => {
    const { variantName, variantOptions } = variants;
    const newVariantTableData = variantTableData;
    const name = variantName.replace(/s/g, '').toLowerCase();
    const variantTableBodyLength = newVariantTableData.tableBody.length;

    // removing last item from table head
    newVariantTableData.tableHead.splice(newVariantTableData.tableHead.length - 1, 1);

    const th = { id: name, label: sentenceCase(variantName), alignRight: false };
    // sku: 'dasd43tg43',price: '', dimensions: '',
    const objTemplate = {
      sku: 'dasd43tg43',
      price: '',
      dimensions: ''
    }
    let td = {};
    if (variantTableBodyLength > 0) {
      // how to determine number of keys and respective values

      const tmp = {}
      const nv = customVariants.forEach(element => {
        const _key = buildVariantKey(element.variantName)
        tmp[_key] = element.variantOptions
      });
      td = {
        ...objTemplate,
        ...tmp,
        [name]: variantOptions,
      };
      console.log(tmp)
      //  add new variant to existing rows/object values
      newVariantTableData.tableBody.forEach(element => {
        element[name] = variantOptions
      });

      newVariantTableData.tableBody.push(td);

    } else {
      td = {
        sku: 'dasd43tg43',
        price: '',
        dimensions: '',
        [variantName.replace(/s/g, '').toLowerCase()]: variantOptions,
      };
      newVariantTableData.tableBody.push(td);
    }

    newVariantTableData.tableHead.push(th);
    //  re-adding action table head to th
    newVariantTableData.tableHead.push({ id: '' });

    setVariantTableData({ ...newVariantTableData });
    setCustomVariants([...customVariants, variants]);
    setOpen(!open);
  };


  const handleDeleteRow = (e, rowId) => {
    console.log(rowId, ' delete row #')
    const row = rowId;
    const arr = variantTableData.tableBody;
    arr.splice(rowId, 1);
    setVariantTableData({ tableHead: variantTableData.tableHead, tableBody: arr })
  }

  const handleAddRow = () => {
    const c = variantTableData.tableBody;
    const d = { ...c[0] };
    console.log(c, d)
    // generate unique sku
    d.sku = 'ds8f8d6wj9tym456978df'
    c.push(d)
    setVariantTableData({ tableHead: variantTableData.tableHead, tableBody: c })
  }

  const gotoVariation = () => {
    setActiveStep(2)

  }

  const handleFileChooser = (e) => {
    const file = e.target.files[0];
    if(file){
      const oldFiles = files;
      setFile([...oldFiles,file] );
    }
    console.log(file)
   
  }
  console.log(activeStep, '...step', completed,files);
  const deleteFile=(index)=>{
    const theFiles = files.filter((f,i)=>i !== index)
    setFile(theFiles);
    
    console.log(index)
  }
  return (
    <>
   
      <Box
        style={{
          width: '100%',
          height: '100%',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
      
        <FormContainer>
         
          <Stepper sx={{ mb: 5 }}>
            {steps.map((step, index) => (
              <Step key={index} completed={completed[index]}>
                <StepButton>{step}</StepButton>
              </Step>))}
          </Stepper>
          <br />
          <Modal open={open} onClose={() => setOpen(!open)}>
            <Box className="modalContent">
              <VariantForm close={() => setOpen(!open)} addVariants={onAddVariants} />
            </Box>
          </Modal>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Box style={{ display: 'none', flexDirection: 'flex-end' }}>
                <IconButton onClick={close}>
                  <Typography variant="h5"> &times; </Typography>
                </IconButton>
              </Box>

              <Grid container spacing={4} columnSpacing={1.5}>

                {activeStep === 1 &&
                  <Grid item container spacing={4} columnSpacing={1.5}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Create a new product</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <RHFTextField name="name" label="Name" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={4}>
                      <RHFTextField name="price" label="Price" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={4}>
                      <RHFTextField name="discount" label="Discount" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={4}>
                      <RHFTextField name="quantity" label="Quantity" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={6}>
                      <RHFTextField name="badge" label="Badge" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    <Grid item xs={6}>
                      <RHFTextField name="categoryID" label="Category" InputLabelProps={{ shrink: true }} select>
                        {['', 'category 1', 'category 2', 'category 3'].map((unit, index) => (
                          <MenuItem key={index} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </RHFTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <RHFTextField name="shortDescription" label="Short Description" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12}>
                      <RHFTextField
                        name="longDescription"
                        rows={4}
                        label="Long Description"
                        multiline
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    {/* <Grid item xs={4}>
                      <RHFTextField name="category" label="Select unit" InputLabelProps={{ shrink: true }} select>
                        {['Kg', 'litre', 'lb'].map((unit, index) => (
                          <MenuItem key={index} value={unit}>
                            {unit}
                          </MenuItem>
                        ))}
                      </RHFTextField>
                    </Grid> */}
                    <Grid item xs={6}>
                      <RHFTextField name="slug" label="Slug" sx={{ display: 'none' }} InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12}>
                      <RHFTextField type='file' name='gallery' id='gallery' sx={{display:'none'}} onChange={handleFileChooser} />
                      <Box component='label' htmlFor='gallery' sx={{}}>
                        <CloudUploadOutlinedIcon sx={{fontSize:'4rem',cursor:'pointer'}}/>
                        <Typography>Upload Product images</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{display:'flex',flexWrap:'wrap'}}>
                      {
                        files.map((file,index)=>{
                          const {name} = file;
                          return(
                            <Box key={index} 
                            sx={{display:'flex',flexDirection:'column',m:1,alignItems:'flex-end'}}>
                            <IconButton sx={{mb:-5,mr:.5,backgroundColor:'#fff'}} onClick={()=>deleteFile(index)}><Close fontSize='small'/></IconButton>
                              <img 
                              src={URL.createObjectURL(file)} 
                              alt={name} 
                              height='200px' 
                              width={200} 
                              style={{objectFit:'cover'}}/>
                              </Box>
                          )
                        })
                      }
                      </Box>
                    </Grid>
                    <Grid item xs={12}>

                      <LoadingButton
                        fullWidth
                        size="large"
                        type="button "
                        sx={{ width: '7rem' }}
                        variant="contained"
                        loading={isSubmitting}
                        id='btn-1'
                      >
                        Next
                      </LoadingButton>
                    </Grid>
                  </Grid>
                }

                {activeStep === 2 &&
                  <Grid item container spacing={4} columnSpacing={1.5}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Create Product Variation</Typography>
                    </Grid>
                    <Grid xs={12}>
                      <Checkbox checked={addVariation} onChange={() => setAddVariation(!addVariation)} /> Add Variation
                    </Grid>
                    {addVariation && <Grid item xs={12}>
                      <ButtonGroup variant="outlined">
                        <Button type="button" onClick={() => setOpen(true)}>
                          Add Option
                        </Button>
                        <Button type="button" onClick={handleAddRow}>
                          Add Row
                        </Button>
                      </ButtonGroup>
                      <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                          <TableHeader headLabel={variantTableData && variantTableData.tableHead} hasCheckbox={false} />

                          <TableBody>
                            {((variantTableData && variantTableData.tableBody) || []).map((row, index) => {
                              const { sku, price, dimensions } = row;
                              // unknown keys and values
                              // refactor later using |for of| loops and |Object.entries|
                              const u = Object.values(row);
                              const _keys = Object.keys(row);

                              return (
                                <TableRow key={index}>
                                  {u.map((variant, j) => {
                                    // find row name/title and assign to html input > name
                                    return (
                                      <TableCell key={j} sx={{ minWidth: '6rem' }}>

                                        {typeof variant === 'object' ? (
                                          <RHFTextField defaultValue="" sx={{ minWidth: '6rem' }} name={`${_keys[j]}_${index}`} size="small" select fullWidth>
                                            <MenuItem value='' placeholder='select'>Select ...</MenuItem>
                                            {variant.map((option, k) => (
                                              <MenuItem key={k} value={option}>
                                                {option}
                                              </MenuItem>
                                            ))}
                                          </RHFTextField>
                                        ) : (
                                          <>
                                            {
                                              _keys[j] === 'sku' ?
                                                <>
                                                  <Typography>{variant}</Typography>
                                                  <RHFTextField defaultValue="" sx={{ minWidth: '6rem', display: 'none' }} name={`${_keys[j]}_${index}`} size="small" fullWidth />
                                                </>
                                                : <RHFTextField defaultValue="" sx={{ minWidth: '6rem' }} name={`${_keys[j]}_${index}`} size="small" fullWidth />
                                            }

                                          </>
                                        )}

                                      </TableCell>
                                    );
                                  })}
                                  <TableCell>
                                    <IconButton tabIndex={index} onClick={() => handleDeleteRow(this, index)}><Delete /></IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>}

                    <Grid item xs={12}>

                      <LoadingButton
                        fullWidth
                        size="large"
                        type="button"
                        sx={{ width: '7rem' }}
                        variant="contained"
                        loading={isSubmitting}
                        onClick={handleStepComplete}
                        id='btn-2'
                      >
                        Next
                      </LoadingButton>
                    </Grid>
                  </Grid>
                }
                {activeStep === 3 && <Grid item xs={12}>

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    sx={{ width: '7rem' }}
                    variant="contained"
                    loading={isSubmitting}
                    onClick={handleNext}
                    id='btn-2'
                  >
                    Submit
                  </LoadingButton>
                </Grid>}
              </Grid>

            </Box>
          </FormProvider>

        </FormContainer>
       
      </Box>

    </>
  );
}

const VariantForm = ({ close, addVariants }) => {
  const Schema = Yup.object().shape({
    variantName: Yup.string().required('Variant name is required'),
    variantOptions: Yup.string().required('Variant options is required'),
  });
  const defaultValues = {
    variantName: '',
    variantOptions: '',
  };
  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (formdata) => {
    const { variantOptions, variantName } = formdata;
    const options = variantOptions && variantOptions.split('|');
    formdata.variantOptions = options;
    return addVariants(formdata);
  };

  return (
    <>
      <FormProvider style={{ width: '24rem' }} methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.8rem' }}>
              <Typography variant="body1">Add Variant</Typography>
              <IconButton onClick={close} variant="outlined">
                <Close />
              </IconButton>
            </Box>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="variantName"
              InputLabelProps={{ shrink: true }}
              label="Variant Name"
              placeholder="Variant name ie: Size, color, etc"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="variantOptions"
              InputLabelProps={{ shrink: true }}
              label="Variant Options"
              placeholder="Variant Options seperate by pipe | symbol"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton fullWidth variant="contained" type="submit" size="large" loading={isSubmitting}>
              Add
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
