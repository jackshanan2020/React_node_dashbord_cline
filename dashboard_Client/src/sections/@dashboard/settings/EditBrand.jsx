import * as Yup from 'yup';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Typography, Box, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types'
// components
import Close from '@mui/icons-material/Close';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// apis


// ----------------------------------------------------------------------
EditBrandForm.propTypes = {
    brand: PropTypes.object.isRequired
}
export default function EditBrandForm({ brand ,close}) {
    const navigate = useNavigate();

    const { id, code, name, details } = brand;

    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required('Brand name is required'),
        details: Yup.string().notRequired(),

    });

    const defaultValues = {
        name,
        details,
        code
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (newData) => {
        console.log(newData)
        newData.id = id
        console.log(newData)
        const send = await window.api.updateBrand(newData);
        if (send) {
            alert('Brand created successfully !')
        } else {
            alert('Could not add brand')
        }
    };

    return (
        <Box>
            <IconButton size='large' onClick={close}>
                <Close />
            </IconButton>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} sx={{ width: '22rem' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Typography>Add Brand</Typography>

                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                        <RHFTextField name="name" label="Name" size='small' />

                        <RHFTextField name="code" label="Code" size='small' />
                        <RHFTextField name="details" rows={3} label="Details" multiline size='small' />
                        <RHFTextField type='file' name="attachment" size='small' />
                    </Stack>
                    <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Save
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </Box>
    );
}
