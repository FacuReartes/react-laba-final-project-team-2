import { useState, useCallback } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  Typography,
} from '@mui/material';
import RejectFilesDialog from '../Dialogs/RejectedFilesDialog';
import PreviewImages from '../Image/PreviewImages';
import { IProducts, useAddProductForm } from '@/lib/schemas/addProductSchemas';
import { FormProvider, Controller, UseFormReturn } from 'react-hook-form';
import { FileRejection } from 'react-dropzone';
import ProductSelect from './ProductSelect';
import useGetGenders from '@/hooks/products/useGetGenders';
import useGetBrands from '@/hooks/products/useGetBrands';
import useGetColors from '@/hooks/products/useGetColors';
import ProductCategorySelect from './ProductCategorySelect';
import ProductSizesButtons from './ProductionSizeButtons';
import { ProductType } from '@/lib/definitions';
import { UseMutationResult } from '@tanstack/react-query';

interface ProductUpdateFormProps {
  title: string
  open: boolean;
  onClose: () => void;
  useUpdateHook: (
    onClose: () => void, 
    methods: UseFormReturn<IProducts>, 
    product: ProductType
  ) => UseMutationResult<void, Error, unknown>
  product: ProductType,
}

export default function ProductUpdateForm({ 
  title,
  open,
  onClose,
  useUpdateHook,
  product,
}: ProductUpdateFormProps) {

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [actionDialog, setActionDialog] = useState<boolean>(false);

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

  const mutation = useUpdateHook(onClose, methods, product)

  const handleUpdateProduct = () => mutation.mutate(methods.getValues());

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

  const handleDialogOnClose = (value: boolean) => {
    setOpenDialog(false);
    setActionDialog(value);
  };

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
              { title }
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
                onClick={handleUpdateProduct}
                disabled={mutation.isPending}
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
                  <TextField
                    label="Description"
                    multiline
                    rows={4}
                    {...field}
                    InputProps={{
                      sx: { fontSize: { xs: '12px', lg: '15px' } },
                    }}
                  />
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

              {mutation.isSuccess && (
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
              onClick={handleUpdateProduct}
              disabled={mutation.isPending}
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
  )

}