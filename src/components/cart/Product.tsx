import React, { 
  FC 
} from 'react'
import { 
  Box, 
  Button, 
  Divider, 
  IconButton, 
  Typography 
} from '@mui/material';
import Image from 'next/image';
import { 
  AddCircle, 
  Delete, 
  RemoveCircle 
} from '@mui/icons-material';

enum QuantityAction {
  plus = 'plus',
  minus = 'minus'
}

interface IProduct {
  id: number,
  imageUrl: string,
  name: string,
  price: string | number,
  gender: string | number,
  quantity: number,
  handleQuantity: (productID: number, action: QuantityAction) => void
}

const Product: FC<IProduct> = props => {
  return (
    <Box 
      sx={{ display: 'flex', 
        my: {xs: '32px', md: '60px'}, 
        px: { xs: '20px', sm: '125px', md: '0px' },  
        position: 'relative', }}
    >

      <Box 
        sx={{ width: { xs: '105px', md: '223px' }, 
          height: { xs: '100px', md: '214px' }, 
          position: 'relative' }}
      >
        <Image 
          src={props.imageUrl}
          alt={props.name}
          fill priority
        /> 
      </Box>

      <Box 
        sx={{ flexGrow: 1, 
          ml: { xs: '15px', md: '46px' }, 
          mb: { xs: '0px', md: '16px' }, 
          display: 'flex', 
          flexDirection: 'column' }}
      >
        <Box 
          sx={{ display: 'flex', 
            justifyContent: 'space-between',
            mb: '4px'}}
        >
          <Typography 
            sx={{ fontWeight: 500, 
            lineHeight: { xs: '14.08px', md: '35.19px' }, 
            fontSize: { xs: '12px', md: '30px' }}}
          >
            {props.name}
          </Typography>
          <Typography 
            sx={{ fontWeight: 500, 
            lineHeight: { xs: '14.08px', md: '35.19px' }, 
            fontSize: { xs: '12px', md: '30px' }}}
          >
            {props.price}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 500,
            lineHeight: { xs: '9.38px', md: '23.46px' },
            fontSize: { xs: '8px', md: '20px' },
            color: 'grey.100',
          }}
        >
          {props.genre}
        </Typography>
        <Typography
          sx={{
            mt: '12px',
            fontWeight: 600,
            lineHeight: '29.33px',
            fontSize: '25px',
            color: 'secondary.light',
            display: { xs: 'none', md: 'block' },
          }}
        >
          In Stock
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: { xs: 'stretch', md: 'flex-end' },
            flexGrow: 1,
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '17px',
              justifyContent: { xs: 'space-between', md: 'none' },
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                gap: '9px',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <IconButton sx={{ padding: 0 }}
                onClick={() => props.handleQuantity(props.id, QuantityAction.minus)>
                <RemoveCircle
                  sx={{ width: '32px', height: '32px', color: 'secondary.200' }}
                />
              </IconButton>
              <Typography
                sx={{
                  lineHeight: '28.15px',
                  fontSize: '24px',
                  color: 'grey.200',
                }}
              >
                {props.quantity}
              </Typography>
              <IconButton sx={{ padding: 0 }}
                onClick={() => props.handleQuantity(props.id, QuantityAction.plus)>
                <AddCircle
                  sx={{
                    width: '32px',
                    height: '32px',
                    color: 'secondary.light',
                  }}
                />
              </IconButton>
            </Box>
            <Typography
              sx={{
                lineHeight: { xs: '14.08px', md: '28.15px' },
                fontSize: { xs: '12px', md: '24px' },
                color: 'grey.200',
              }}
            >
              Quantity
            </Typography>

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ display: { xs: 'none', md: 'block' } }}
            />
            <Button
              sx={{
                fontWeight: 400,
                lineHeight: { xs: '14.08px', md: '28.15px' },
                fontSize: { xs: '12px', md: '24px' },
                color: 'grey.300',
              }}
              startIcon={<Delete sx={{ mr: { xs: '-4px', md: '0px' } }} />}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
