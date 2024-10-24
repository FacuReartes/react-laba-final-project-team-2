import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export default function InvoiceDownload({ href }: { href: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <a
        href={href}
        download="invoice.pdf"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Image src="/file.svg" width={24} height={24} alt="Download Invoice" />
        <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
          PDF Invoice Download
        </Typography>
      </a>
    </Box>
  );
}
