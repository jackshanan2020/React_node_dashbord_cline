import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sentenceCase } from 'change-case';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Box, Grid, styled, MenuItem, Typography, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFMultiCheckbox, RHFTextField } from '../../../components/hook-form';
import Scrollbar from '../../../components/Scrollbar';
// mock
import productlist from '../../../_mock/inventory.products';
//  styled component
const FormContainer = styled(Box)({
  width: '60rem',
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '.7rem',
  height: '40rem',
  overflow: 'hidden',
});
export default function OrderCreateForm({ close, products }) {
  const [productCatalogue, setProductCatalogue] = useState(products);
  const [productSelect, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartItemQty, setCartItemQty] = useState([]);
  const [select, setSelect] = useState([]);

  const Schema = Yup.object().shape({
    status: Yup.string(),
    customer: Yup.string(),
  });

  const defaultValues = {
    status: 'pending',
    customer: '',
  };

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log(data, cartItemQty, productSelect);
  };

  const onSelect = (e) => {
    const selected = productSelect;
    const pcode = e.target.value;
    if (selected && selected.length > 0) {
      //  check if already exist in selected list
      const i = selected.filter((f) => f.productCode === pcode);
      if (i.length > 0) {
        //  remove
        const rem = selected.filter((s) => s.productCode !== pcode);
        setSelectedProducts(rem);
      } else {
        // add to list
        const newItem = productCatalogue.filter((p) => p.productCode === pcode)[0];
        newItem.orderQty = 1;
        setSelectedProducts([...productSelect, newItem]);
      }
    } else {
      const item = productCatalogue[productCatalogue.findIndex((itm) => itm.productCode === pcode)];
      item.orderQty = 1;
      setSelectedProducts([item]);
    }
  };

  const addOrderQty = (e) => {
    const val = e.target.value;
    const productCode = e.target.name;
    const tmp = productSelect;
    const index = tmp.findIndex((t) => t.productCode === productCode);
    tmp[index].orderQty = val;
    setSelectedProducts(tmp);
  };

  console.log(productSelect, cartItemQty);
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
        <Grid container disrection="row">
          <Grid item xs={6}>
            <Box id="form-holder-box" style={{ overflow: 'hidden', height: '36rem' }}>
              <Scrollbar>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <Box>
                    <Box style={{ display: 'flex', flexDirection: 'flex-end' }}>
                      <IconButton onClick={close}>
                        <Typography variant="h5"> &times; </Typography>
                      </IconButton>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h4">Create a new Order</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <RHFTextField name="customer" label="Customer Name" InputLabelProps={{ shrink: true }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ height: 'auto', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                          <CartItemsElement items={productSelect} addOrderQty={addOrderQty} />
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <RHFTextField name="status" label="Status" InputLabelProps={{ shrink: true }} select>
                          {['paid', 'canceled', 'pending'].map((status, index) => (
                            <MenuItem key={index} value={status}>
                              {sentenceCase(status)}
                            </MenuItem>
                          ))}
                        </RHFTextField>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="h5">Total </Typography>
                        <Label variant="ghost" color="default">
                          {total}
                        </Label>
                      </Grid>

                      <Grid item xs={12}>
                        {productSelect.length > 0 && (
                          <LoadingButton
                            fullWidth
                            sx={{ backgroundColor: '#333', '&:hover': { backgroundColor: '#333' } }}
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                          >
                            Continue
                          </LoadingButton>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </FormProvider>
              </Scrollbar>
            </Box>
          </Grid>
          {/* product catalogue list pane */}
          <Grid item xs={6}>
            <Box style={{ borderLeft: '1px solid #ddd', height: '36rem',overflow:'hidden', padding: '1rem 0 0 2rem' }}>
              <Scrollbar>
                <Box>
                  <Typography variant="h6">Select Product items</Typography>
                  <br/>
                  <ProductCatalogue list={products} onSelect={onSelect} />
                </Box>
              </Scrollbar>
            </Box>
          </Grid>
        </Grid>
      </FormContainer>
    </Box>
  );
}

const ProductCatalogue = ({ list, onSelect }) => {
  return (
    <Grid container>
      <Grid item>
        {list &&
          list.map((row, index) => {
            const { id, productCode, title } = row;
            return (
              <MenuItem key={index} value={productCode}>
                <Checkbox value={productCode} onChange={onSelect} />
                {title}
              </MenuItem>
            );
          })}
      </Grid>
    </Grid>
  );
};

const CartItemsElement = ({ items, addOrderQty }) => {
  return (
    <>
      <Box
        style={{
          height: 'auto',
          overflow: 'hidden',
          padding: '.8rem',
        }}
      >
        {items.map((item, index) => (
          <Box style={{ margin: '1rem 0', borderTop: '1px solid #ddd', padding: '1rem .4rem' }} key={index}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={9} key={index}>
                <Typography>{sentenceCase(item.title)}</Typography>
              </Grid>
              <Grid item xs={3}>
                <RHFTextField
                  InputLabelProps={{ shrink: true }}
                  label="Quantity"
                  onChange={addOrderQty}
                  id={item.id?.toString()}
                  name={`${item.productCode}`}
                  defaultValue={item.orderQty}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </>
  );
};
