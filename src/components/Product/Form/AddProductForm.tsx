'use client';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { FileRejection } from 'react-dropzone';
import PreviewImages from '../Image/PreviewImages';
import ProductNameInput from './ProductNameInput';
import ProductPriceInput from './ProductPriceInput';
import ProductDescriptionInput from './ProductDescriptionInput';
import ProductSizesButtons from './ProductionSizeButtons';
import RejectFilesDialog from '../Dialogs/RejectedFilesDialog';
import ProductSelect from './ProductSelect';
import { IProducts, useAddProductForm } from '@/lib/schemas/addProductSchemas';
import { FormProvider } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProductCategorySelect from './ProductCategorySelect';
import useGetGenders from '@/hooks/products/useGetGenders';
import useGetBrands from '@/hooks/products/useGetBrands';
import useGetColors from '@/hooks/products/useGetColors';
import Popup from '../../common/Popup';
import { INewProduct, useAddProduct } from '@/hooks/useAddProduct';

const AddProductForm = () => {
  const isMdUp = useMediaQuery('( min-width: 600px )');
  const [productImages, setProductImages] = useState<File[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [actionDialog, setActionDialog] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const router = useRouter();

  const { data: session } = useSession();
  const userID = session?.user.user.id;
  const token = session?.user.jwt;

  const methods = useAddProductForm();

  const { mutate, isSuccess, reset, isPending } = useAddProduct(token, methods, setProductImages, setOpenPopup)

  const submitData = (data: IProducts) => {
    const { images, ...rest } = data;
    const newProduct: INewProduct = {
      images,
      product: {
        data: {
          teamName: 'team-2',
          ...rest,
          userID: userID,
        },
      },
    };
    mutate(newProduct);
  };

  const handleAcceptedFiles = (files: File[]) => {
    setProductImages(prev => [...prev, ...files]);
  };

  const handleRejectedFiles = (fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      setOpenDialog(true);
    }
  };

  const handleDeleteImage = (targetIndex: number) => {
    const prodImages = productImages.filter(
      (temp, index) => index !== targetIndex
    );
    setProductImages(prodImages);
    methods.setValue('images', prodImages);
  };

  const handleDialogOnClose = (value: boolean) => {
    setOpenDialog(false);
    setActionDialog(value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <FormProvider {...methods}>
        <form
          style={{ width: '100%' }}
          onSubmit={methods.handleSubmit(submitData)}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { lg: 'row', xs: 'column' },
              gap: { lg: '100px', xs: '24px' },
            }}
          >
            <Box
              sx={{
                width: { lg: '436px', xs: '100%' },
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <Button
                type="submit"
                data-testid='submit'
                disabled={isPending}
                sx={{
                  position: 'absolute',
                  top: { lg: '58px', xs: '' },
                  bottom: { lg: '', xs: '24px' },
                  right: { lg: '59px', xs: '20px' },
                  width: { lg: '152px', xs: 'calc(100% - 40px)' },
                  height: '40px',
                  bgcolor: 'secondary.light',
                  color: 'common.white',
                  fontSize: '16px',
                  ':hover': { bgcolor: 'secondary.main' },
                }}
              >
                Save
              </Button>

              <ProductNameInput />

              <ProductPriceInput />

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <ProductSelect queryObj={useGetGenders()} />
                <ProductSelect queryObj={useGetBrands()} />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <ProductCategorySelect />
                <ProductSelect queryObj={useGetColors()} />
              </Box>

              <ProductDescriptionInput />

              <ProductSizesButtons />
            </Box>

            <Box
              sx={{
                width: { lg: '100%', xs: 'calc(100% - 40px)' },
              }}
            >
              <Box>
                <Typography sx={{ mb: 1 }} variant="h4">
                  Product images
                </Typography>
                <PreviewImages
                  gallery={productImages}
                  onFileAccepted={handleAcceptedFiles}
                  onFileRejected={handleRejectedFiles}
                  onDelete={handleDeleteImage}
                />
              </Box>
            </Box>
          </Box>
        </form>
      </FormProvider>
      <RejectFilesDialog
        selectedValue={actionDialog}
        open={openDialog}
        onClose={handleDialogOnClose}
      />
      <Snackbar
        open={isSuccess}
        autoHideDuration={4000}
        onClose={reset}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={reset}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          New product has been added successfully
        </Alert>
      </Snackbar>
      <Popup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        title="Add product error"
        actions={
          <>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              Try again
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => {
                setOpenDialog(false);
                router.push('/profile/products');
              }}
            >
              Go to my products
            </Button>
          </>
        }
      >
        <Typography variant={isMdUp ? 'h6' : 'body1'}>
          Something went wrong!
        </Typography>
      </Popup>
    </Box>
  );
};

export default AddProductForm;
