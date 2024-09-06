import { Box, Container } from '@mui/material';

export default function ProductDetail({ id }: { id: string | number }) {
  const productDetail = {
    title: 'Nike Air Max 270',
    price: '160',
    genre: 'Womens shoes',
    description:
      'Boasting the first-ever Max Air unit created specifically for Nike Sportswear, the Nike Air Max 270 delivers an Air unit that absorbs and gives back energy with every springy step. Updated for modern comfort, it nods to the original, 1991 Air Max 180 with its exaggerated tongue top and heritage tongue logo.',
  };

  console.log(id);
  return (
    <Container>
      <Box></Box>
    </Container>
  );
}
