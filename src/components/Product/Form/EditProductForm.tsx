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
import { FormProvider } from 'react-hook-form';
import { FileRejection } from 'react-dropzone';
import ProductSelect from './ProductSelect';
import useGetGenders from '@/hooks/products/useGetGenders';
import useGetBrands from '@/hooks/products/useGetBrands';
import ProductSizesButtons from './ProductionSizeButtons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { env } from '../../../../env';
import useGetColors from '@/hooks/products/useGetColors';

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
  const [name, setName] = useState(product.attributes.name);
  const [price, setPrice] = useState(product.attributes.price);
  const [description, setDescription] = useState(
    product.attributes.description
  );
  const [color, setColor] = useState(product.attributes.color.data.id || '');
  const [gender, setGender] = useState(product.attributes.gender.data.id || '');
  const [brand, setBrand] = useState(product.attributes.brand.data.id || '');
  const [productImages, setProductImages] = useState(
    product.attributes.images.data
  );
  const [sizes, setSizes] = useState(product.attributes.sizes.data.map(size => size.id));
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [actionDialog, setActionDialog] = useState<boolean>(false);

  const { data: session } = useSession();
  const token = session?.user.jwt;

  const methods = useAddProductForm();
  const queryClient = useQueryClient();

  const handleDialogOnClose = (value: boolean) => {
    setOpenDialog(false);
    setActionDialog(value);
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (updatedProductData: any) => {
      const formData = new FormData();
      productImages.forEach((img: File | { id: number }) => {
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
          name,
          price,
          description,
          color,
          gender,
          brand,
          sizes,
          images: [
            ...productImages
              .filter(img => !(img instanceof File))
              .map(img => img.id),
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
      onClose();
    },
    onError: error => {
      console.log('Error updating product:', error);
    },
  });

  const handleEditProduct = () => {
    const updatedProductData = {
      name,
      price,
      description,
      color: color,
      gender: gender,
      brand: brand,
      sizes: sizes,
      images: productImages,
    };
    mutate(updatedProductData);
  };

  const handleAcceptedFiles = (files: File[]) => {
    setProductImages(prev => [...prev, ...files]);
  };

  const handleRejectedFiles = (fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      setOpenDialog(true);
    }
  };

  const handleDeleteImage = useCallback((targetIndex: number) => {
    setProductImages(prevImages =>
      prevImages.filter((_, index) => index !== targetIndex)
    );
  }, []);

  return (
    <FormProvider {...methods}>
      <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
        <Box sx={{ py: '53px', px: '40px', background: '#FFFFFF', paddingRight: { lg: '85px' } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <DialogTitle
              variant="h1"
              sx={{ p: 0, mb: '35px', fontSize: { lg: '45px', xs: '30px' } }}
            >
              Edit Product
            </DialogTitle>
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, justifyContent: 'flex-end', mt: '16px' }}>
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
          <Typography sx={{ width: { lg: '890px' }, mb: '40px', fontSize: { xs: '12px', lg: '15px'} }}>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero&apos;s De Finibus Bonorum
            et Malorum for use in a type specimen book. It usually begins with
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { lg: 'row', xs: 'column'}, justifyContent: 'space-between' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '100%',
                maxWidth: '436px',
              }}
            >
              <TextField
                label="Product name"
                value={name}
                onChange={e => setName(e.target.value)}
                InputProps={{ sx: { fontSize: { xs: '12px', lg: '15px' } }}}
              />
              <TextField
                label="Price"
                value={price}
                onChange={e => setPrice(parseFloat(e.target.value) || 0)}
                InputProps={{ sx: { fontSize: { xs: '12px', lg: '15px' } }}}
              />
              <TextField
                label="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                rows={4}
                InputProps={{ sx: { fontSize: { xs: '12px', lg: '15px' } }}}
              />

              <ProductSelect queryObj={useGetColors()} value={color} onChange={(e) => setColor(e.target.value)} />

              <Box sx={{ display: 'flex', gap: '24px' }}>
                <ProductSelect queryObj={useGetGenders()} value={gender} onChange={(e) => setGender(e.target.value)}  />
                <ProductSelect queryObj={useGetBrands()} value={brand} onChange={(e) => setBrand(e.target.value)}/>
              </Box>

              <ProductSizesButtons selectedSizes={sizes} onChangeSizes={setSizes} />

              {isSuccess && (
                <Typography>Product updated successfully!</Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', mt: '24px' }}>
              <PreviewImages
                gallery={productImages}
                onFileAccepted={handleAcceptedFiles}
                onFileRejected={handleRejectedFiles}
                onDelete={handleDeleteImage}
              />
            </Box>
          </Box>
          <Box sx={{ display: { lg: 'none', xs: 'flex' }, justifyContent: 'flex-end', mt: '20px' }}>
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
