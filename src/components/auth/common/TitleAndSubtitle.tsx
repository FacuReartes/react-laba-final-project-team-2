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
        sx={{ mb: '48px', pl: '20px', fontSize: { md: '15px', xs: '12px' } }}
      >
        {subtitle}
      </Typography>
    </>
  );
}
