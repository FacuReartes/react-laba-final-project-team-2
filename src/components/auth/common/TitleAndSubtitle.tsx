import { Typography } from '@mui/material';

type Props = {
  title: string;
  subtitle: string;
};

export default function TitleAndSubtitle({ title, subtitle }: Props) {
  return (
    <>
      <Typography variant={'h1'} sx={{ fontSize: { md: '45px', xs: '30px' } }}>
        {title}
      </Typography>
      <Typography
        variant={'subtitle1'}
        sx={{ mb: {xs: '20px', md: '48px'}, pl: {xs: '0', md: '20px'}, fontSize: { md: '15px', xs: '12px' } }}
      >
        {subtitle}
      </Typography>
    </>
  );
}
