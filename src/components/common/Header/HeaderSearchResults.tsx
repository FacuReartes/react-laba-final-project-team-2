import { Box, Typography } from '@mui/material';
import Link from 'next/link';

interface HeaderSearchResultsProps {
  searchTerm: string;
  selectedTerm?: string;
  productsNameList?: string[];
  openResults: boolean;
}

const HeaderSearchResults = ({
  searchTerm,
  productsNameList,
  openResults,
}: HeaderSearchResultsProps) => {
  const highlightText = (text: string) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === searchTerm.toLowerCase()
                ? { fontWeight: '700' }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </>
    );
  };

  return (
    openResults && (
      <Box
        sx={{
          bgcolor: 'grey.400',
          width: '100%',
          height: '100vh',
          position: 'absolute',
          top: { xs: '64px', md: '120px' },
          zIndex: '2',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: '1070px',
            width: { md: 'calc(100% - 292px)', xs: '80%' },
            mt: { xs: '20px' },
          }}
        >
          <Typography
            sx={{
              fontWeight: '500',
              color: 'grey.100',
              fontSize: '20px',
              mb: '12px',
            }}
          >
            Popular Search Terms
          </Typography>
          {productsNameList &&
            (productsNameList.length > 0 ? (
              productsNameList.map(productName => (
                <Box
                  key={'id-search-' + productName}
                  sx={{
                    padding: '12px',
                    borderRadius: '20px',
                    ':hover': {
                      bgcolor: 'grey.50',
                    },
                  }}
                >
                  <Link
                    href={'/' + productName}
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    <Typography
                      sx={{ color: 'common.black', fontSize: '22px' }}
                    >
                      {highlightText(productName)}
                    </Typography>
                  </Link>
                </Box>
              ))
            ) : (
              <Typography>No matches found</Typography>
            ))}
        </Box>
      </Box>
    )
  );
};

export default HeaderSearchResults;
