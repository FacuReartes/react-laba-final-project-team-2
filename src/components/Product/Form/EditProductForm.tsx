import { useState, useCallback } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  Typography,
} from '@mui/material';
import { ProductType } from '@/lib/definitions';
import RejectFilesDialog from '../Dialogs/RejectedFilesDialog';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import PreviewImages from '../Image/PreviewImages';
import { useAddProductForm } from '@/lib/schemas/addProductSchemas';
import { FormProvider, Controller } from 'react-hook-form';
import { FileRejection } from 'react-dropzone';
import ProductSelect from './ProductSelect';
import useGetGenders from '@/hooks/products/useGetGenders';
import useGetBrands from '@/hooks/products/useGetBrands';
import useGetColors from '@/hooks/products/useGetColors';
import ProductCategorySelect from './ProductCategorySelect';
import ProductSizesButtons from './ProductionSizeButtons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { env } from '../../../../env';
import AIButton from '@/components/chat/AIButton/AIButton';
import { generateDescription } from '@/app/api/chat/textGenerator';

interface EditProductFormProps {
  product: ProductType;
  open: boolean;
  onClose: () => void;
}

export default function EditProductForm({
  product,
  open,
  onClose,
}: EditProductFormProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [actionDialog, setActionDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: session } = useSession();
  const token = session?.user.jwt;

  const methods = useAddProductForm({
    name: product.attributes.name,
    price: product.attributes.price,
    description: product.attributes.description,
    color: product.attributes.color.data.id || '',
    categories: product.attributes.categories.data.map(category => category.id),
    gender: product.attributes.gender.data.id || '',
    brand: product.attributes.brand.data.id || '',
    sizes: product.attributes.sizes.data.map(size => size.id),
    images: product.attributes.images.data,
  });
  const queryClient = useQueryClient();

  const handleDialogOnClose = (value: boolean) => {
    setOpenDialog(false);
    setActionDialog(value);
  };

  const { mutate, isPending, isSuccess } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (updatedProductData: any) => {
      const formData = new FormData();
      methods.getValues('images').forEach((img: File | { id: number }) => {
        if (img instanceof File) {
          formData.append('files', img);
        }
      });

      let imagesId: number[] = [];
      if (formData.has('files')) {
        const uploadRes = await axios.post(`${env.BASE_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        imagesId = uploadRes.data.map((image: { id: number }) => image.id);
      }

      const updatedProduct = {
        data: {
          name: methods.getValues('name'),
          price: methods.getValues('price'),
          description: methods.getValues('description'),
          categories: methods.getValues('categories'),
          color: methods.getValues('color'),
          gender: methods.getValues('gender'),
          brand: methods.getValues('brand'),
          sizes: methods.getValues('sizes'),
          images: [
            ...methods
              .getValues('images')
              .filter(img => !(img instanceof File) && 'id' in img)
              .map(img => (img as { id: number }).id),
            ...imagesId,
          ],
        },
      };

      return axios.put(
        `${env.BASE_URL}/products/${product.id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: [`product-${product.id}`] });
      methods.reset();
      onClose();
    },
    onError: error => {
      console.log('Error updating product:', error);
    },
  });

  const handleEditProduct = () => mutate(methods.getValues());

  const handleAcceptedFiles = (files: File[]) => {
    methods.setValue('images', [...methods.getValues('images'), ...files]);
  };

  const handleRejectedFiles = (fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      setOpenDialog(true);
    }
  };

  const handleDeleteImage = useCallback(
    (targetIndex: number) => {
      const prodImages = methods
        .getValues('images')
        .filter((temp, index) => index !== targetIndex);
      methods.setValue('images', prodImages);
    },
    [methods]
  );

  const handleGenerateText = async () => {
    const productTitle = methods.getValues('name');
    setLoading(true);
    try {
      const generatedDescription = await generateDescription(productTitle);
      methods.setValue('description', generatedDescription);
    } catch (error) {
      console.error('Error generating text:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider {...methods}>
      <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
        <Box
          sx={{
            py: '53px',
            px: '40px',
            background: '#FFFFFF',
            paddingRight: { lg: '85px' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <DialogTitle
              variant="h1"
              sx={{ p: 0, mb: '35px', fontSize: { lg: '45px', xs: '30px' } }}
            >
              Edit Product
            </DialogTitle>
            <Box
              sx={{
                display: { xs: 'none', lg: 'flex' },
                justifyContent: 'flex-end',
                mt: '16px',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'secondary.light',
                  color: 'common.white',
                  width: '152px',
                  height: '40px',
                  ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
                }}
                color="primary"
                onClick={handleEditProduct}
                disabled={isPending}
              >
                Save
              </Button>
            </Box>
          </Box>
          <Typography
            sx={{
              width: { lg: '890px' },
              mb: '40px',
              fontSize: { xs: '12px', lg: '15px' },
            }}
          >
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero&apos;s De Finibus Bonorum
            et Malorum for use in a type specimen book. It usually begins with
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { lg: 'row', xs: 'column' },
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '100%',
                maxWidth: '436px',
              }}
            >
              <Controller
                name="name"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    label="Product name"
                    {...field}
                    InputProps={{
                      sx: { fontSize: { xs: '12px', lg: '15px' } },
                    }}
                  />
                )}
              />
              <Controller
                name="price"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    label="Price"
                    type="number"
                    {...field}
                    InputProps={{
                      sx: { fontSize: { xs: '12px', lg: '15px' } },
                    }}
                  />
                )}
              />
              <Controller
                name="description"
                control={methods.control}
                render={({ field }) => (
                  <Box position='relative'>
                    <TextField
                      label="Description"
                      multiline
                      fullWidth
                      rows={8}
                      {...field}
                      InputProps={{
                        sx: { fontSize: { xs: '12px', lg: '15px' } },
                      }}
                      value={field.value}
                    />
                    <Box
                      position="absolute"
                      bottom={10}
                      right={10}
                    >
                      <AIButton onClick={handleGenerateText} disabled={loading} />
                    </Box>
                  </Box>
                )}
              />

              <Box sx={{ display: 'flex', gap: '24px' }}>
                <ProductCategorySelect />
                <ProductSelect queryObj={useGetColors()} />
              </Box>

              <Box sx={{ display: 'flex', gap: '24px' }}>
                <ProductSelect queryObj={useGetGenders()} />
                <ProductSelect queryObj={useGetBrands()} />
              </Box>

              <ProductSizesButtons />

              {isSuccess && (
                <Typography>Product updated successfully!</Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', mt: '24px' }}>
              <PreviewImages
                gallery={methods.watch('images')}
                onFileAccepted={handleAcceptedFiles}
                onFileRejected={handleRejectedFiles}
                onDelete={handleDeleteImage}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: { lg: 'none', xs: 'flex' },
              justifyContent: 'flex-end',
              mt: '20px',
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: 'secondary.light',
                color: 'common.white',
                width: '100%',
                height: '40px',
                ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
              }}
              color="primary"
              onClick={handleEditProduct}
              disabled={isPending}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>
      <RejectFilesDialog
        selectedValue={actionDialog}
        open={openDialog}
        onClose={handleDialogOnClose}
      />
    </FormProvider>
  );
}
