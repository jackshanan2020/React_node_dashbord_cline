// gets list of products from product table and add purchase or inward info
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { IconButton, Box, Grid, styled, MenuItem, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Close from '@mui/icons-material/Close';


// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { fDate } from '../../../utils/formatTime';
//  mock
//  styled component
const FormContainer = styled(Box)({
  width: '27rem',
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '.7rem',

});
export default function InventoryPurchaseForm({ close }) {
  const [productSelect, setProductSelect] = useState(null);

  const [products, setProducts] = useState([])
  useEffect(() => {
    (
      async function () {
        const getproducts = await window.api.getProducts();
        if (getproducts) {
          console.log(getproducts)
          setProducts(getproducts);
        }
      }
    )();

    return () => { }
  }, [])

  const Schema = Yup.object().shape({
    title: Yup.string(),
    quantity: Yup.number(),
    amount: Yup.number(),
    productCode: Yup.string(),
    unitPrice: Yup.number()
  });

  const defaultValues = {
    title: '',
    unitPrice: '',
    quantity: '',
    amount: '',
    productCode: '',
  };

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formData) => {

    const payload = {
      amount: formData.amount,
      title: formData.title,
      quantity: formData.quantity,
      unitPrice: formData.unitPrice,
      unit: productSelect.unit,
      supplier: formData.supplier,
      date: formData.date,
      reference: formData.reference,
      comments: formData.comments,
      productId: productSelect.id,
      isDraft: formData.isDraft

    }

    //------------------------------------------
    const post = await window.api.createProductInward(payload);
    if (post) {
      alert('Operation successful !')
    } else {
      alert('something went wrong')
    }
  };

  const onSelectProduct = (pdt) => {
    const index = products.findIndex((p) => p.productCode === pdt.target.value);
    const item = products[index];
    setProductSelect(item);
    //    console.log(item);
  };

  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormContainer>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Box style={{ display: 'flex', flexDirection: 'flex-end' }}>
              <IconButton onClick={close}>
                <Close />
              </IconButton>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4">Product Purchase (inward)</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  {fDate(new Date())}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <RHFTextField
                  name="title"
                  label="Select Product"
                  InputLabelProps={{ shrink: true }}
                  select
                  value={productSelect && productSelect.title}
                  onChange={onSelectProduct}
                >
                  {products.map((product, index) => {
                    const { id, title, productCode } = product;
                    return (<MenuItem key={index} value={productCode}>{title}</MenuItem>)
                  })}
                </RHFTextField>
              </Grid>

              <Grid item xs={6}>
                <RHFTextField
                  name="productCode"
                  label="Product Code"
                  value={productSelect && productSelect.productCode}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={6}>
                <RHFTextField name="quantity" label="Quantity" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField name="unitPrice" label="Unit Price" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={6}>
                <RHFTextField name="amount" label="Total" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Add
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>

      </FormContainer>
    </Box>
  );
}
