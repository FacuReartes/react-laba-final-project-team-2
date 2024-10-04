import { Typography } from '@mui/material';
import Link from 'next/link';

type Props = {
  text?: string;
  btnText: string;
  goto: string;
};

export default function SecondaryActionButton({ text, btnText, goto }: Props) {
  return (
    <Typography
      variant="subtitle1"
      sx={{ color: 'common.black', textAlign: 'center' }}
    >
      {text}
      <Link
        style={{
          textDecoration: 'none',
          fontWeight: '500',
        }}
        href={goto}
      >
        <Typography sx={{ color: 'secondary.light', display: 'inline' }}>
          {btnText}
        </Typography>
      </Link>
    </Typography>
  );
}
