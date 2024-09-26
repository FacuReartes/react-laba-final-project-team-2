import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContentText,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import Image from 'next/image';
import { ProductType } from '@/lib/definitions';
import RejectFilesDialog from './RejectedFilesDialog';
import TrashIcon from '../../../public/trash-icon.svg';
import axios from 'axios';
import { useSession } from 'next-auth/react';

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
  const [images, setImages] = useState(product.attributes.images.data);
  // const [gender, setGender] = useState<Gender | ''>(product.attributes.gender.data.attributes.name);
  // const [brand, setBrand] = useState(product.attributes.brand.data.attributes.name);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [actionDialog, setActionDialog] = useState<boolean>(false);

  const { data: session } = useSession();
  const token = session?.user.jwt;

  const handleDialogOnClose = (value: boolean) => {
    setOpenDialog(false);
    setActionDialog(value);
  };

  const handleEditProduct = async () => {
    try {
      const formData = new FormData();

      images.forEach((x: File | { id: number }) => {
        if (x instanceof File) {
          formData.append('files', x);
        }
      });

      let imagesId = [];
      if (formData.has('files')) {
        const uploadRes = await axios.post(
          'https://shoes-shop-strapi.herokuapp.com/api/upload',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        imagesId = uploadRes.data.map((image: { id: number }) => image.id);
      }

      const updatedProduct = {
        data: {
          name,
          price,
          description,
          images: [
            ...images.filter(img => !(img instanceof File)).map(img => img.id),
            ...imagesId,
          ],
        },
      };
      
      console.log('🚀 ~ handleEditProduct ~ updatedProduct:', updatedProduct);

      const res = await axios.put(
        `https://shoes-shop-strapi.herokuapp.com/api/products/${product.id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status !== 200) {
        throw new Error('Failed to update product');
      }

      console.log('Product updated');
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = (imageId: number) => {
    setImages(prevImages => prevImages.filter(image => image.id !== imageId));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <Box sx={{ py: '53px', px: '40px', background: '#FFFFFF' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle
            variant="h1"
            sx={{ p: 0, fontSize: { lg: '45px', xs: '30px' } }}
          >
            Edit Product
          </DialogTitle>
          <Button
            variant="contained"
            onClick={handleEditProduct}
            type="submit"
            sx={{
              width: '152px',
              height: '40px',
              bgcolor: 'secondary.light',
              transition: 'opacity .2s ease',
              ':hover': { bgcolor: 'secondary.light', opacity: '.9' },
            }}
          >
            Save
          </Button>
        </Box>
        <DialogContentText
          variant="subtitle1"
          sx={{ mt: { lg: '35px', xs: '30px' }, mb: '40px', width: '890px' }}
        >
          Edit the details of your product below.
        </DialogContentText>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              width: '436px',
            }}
          >
            <TextField
              fullWidth
              label="Product Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Price"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
            />
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender-select"
                  // value={gender}
                  label="Gender"
                  // onChange={(e) => setGender(e.target.value as Gender)}
                >
                  <MenuItem value="Man">Man</MenuItem>
                  <MenuItem value="Woman">Woman</MenuItem>
                  <MenuItem value="Unisex">Unisex</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select
                  labelId="brand-label"
                  id="brand-select"
                  // value={brand}
                  label="Brand"
                  // onChange={(e) => setBrand(e.target.value)}
                >
                  <MenuItem value="Nike">Nike</MenuItem>
                  <MenuItem value="Adidas">Adidas</MenuItem>
                  <MenuItem value="Puma">Puma</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={10}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: '-12px' }}>
            <Typography>Product images</Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '52px',
                width: '700px',
                flexWrap: 'wrap',
              }}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: '320px',
                    height: '380px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    '&:hover .image-overlay': {
                      opacity: 1,
                    },
                  }}
                >
                  <Image
                    src={image.attributes.url}
                    alt={image.attributes.name}
                    width={320}
                    height={380}
                    layout="responsive"
                    objectFit="cover"
                  />
                  <Box
                    className="image-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton
                      onClick={() => handleDeleteImage(image.id)}
                      sx={{ color: 'white' }}
                    >
                      <Image src={TrashIcon} alt="Delete Icon" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <RejectFilesDialog
        selectedValue={actionDialog}
        open={openDialog}
        onClose={handleDialogOnClose}
      />
    </Dialog>
  );
}
