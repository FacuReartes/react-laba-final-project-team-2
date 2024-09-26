'use client';
import { Box, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import { FileRejection } from 'react-dropzone';
import PreviewImages from './PreviewImages';
import ProductNameInput from './ProductNameInput';
import ProductPriceInput from './ProductPriceInput';
import ProductDescriptionInput from './ProductDescriptionInput';
import ProductSizesButtons from './ProductionSizeButtons';
import RejectFilesDialog from './RejectedFilesDialog';
import ProductSelect from './ProductSelect';
import { IProducts, useAddProductForm } from '@/lib/schemas/addProductSchemas';
import { FormProvider } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ProductCategorySelect from './ProductCategorySelect';
import useGetGenders from '@/hooks/useGetGenders';
import useGetBrands from '@/hooks/useGetBrands';
import useGetColors from '@/hooks/useGetColors';
import { env } from '../../../env';

interface ICompletedProduct {
  teamName: string;
  userID?: number;
  name: string;
  images?: number[];
  description: string;
  brand: number | string;
  categories: number[] | string[];
  color: number | string;
  gender: number | string;
  sizes: number[];
  price: string;
}

interface INewProduct {
  images: File[];
  product: {
    data: ICompletedProduct;
  };
}

const AddProductForm = () => {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [actionDialog, setActionDialog] = useState<boolean>(false);

  const router = useRouter();

  const { data: session } = useSession();
  const userID = session?.user.user.id;
  const token = session?.user.jwt;

  const methods = useAddProductForm();

  const queryClient = useQueryClient();

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

  const { mutate } = useMutation({
    mutationFn: (newProduct: INewProduct) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const formData = new FormData();
      newProduct.images.forEach((x: File) => {
        formData.append('files', x);
      });

      return axios
        .post(`${env.BASE_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          const imagesId = res.data.map((image: { id: number }) => image.id);
          newProduct.product.data.images = imagesId;

          axios.post(`${env.BASE_URL}/products`, newProduct.product, config);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.push('/profile/products');
    },
    onError: error => console.log(error),
  });

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
    </Box>
  );
};

export default AddProductForm;
