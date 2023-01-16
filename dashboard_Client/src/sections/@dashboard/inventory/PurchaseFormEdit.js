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
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { fDate } from '../../../utils/formatTime';

//  styled component
const FormContainer = styled(Box)({
  width: '27rem',
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '.7rem',

});
export default function PurchaseFormEdit({ close, content }) {
  const {
    id,
    sku,
    brand,
    price,
    quantity,
    unit,
    title,
    availability,
    productCode,
    unitPrice,
    amount
  } = content;

  const [productSelect, setProductSelect] = useState(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    (
      async function () {
        const getproducts = await window.api.getProducts();
        if (getproducts) {
          console.log(getproducts, '***')
          setProducts(getproducts);
        }
      }
    )();

    return () => { }
  }, [])

  const Schema = Yup.object().shape({
    sku: Yup.string(),
    brand: Yup.string(),
    price: Yup.number(),
    quantity: Yup.number(),
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
    unitPrice,
    amount
  };

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (payload) => {
    payload.id = id;
    const post = await window.api.updateProductInward(payload)
    if (post) {
      console.log('success !')
    } else {
      alert('Something went wrong')
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
                  onChange={onSelectProduct}
                >
                  {products.map((product, index) => {
                    const { id, title, productCode } = product;
                    return <MenuItem value={productCode}>{title}</MenuItem>;
                  })}
                </RHFTextField>
              </Grid>

              <Grid item xs={6}>
                <RHFTextField
                  name="productCode"
                  label="Product Code"
                  value={products && products.productCode}
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
