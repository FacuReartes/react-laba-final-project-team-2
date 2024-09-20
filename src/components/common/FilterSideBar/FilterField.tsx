import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactNode } from 'react';

interface Props {
  fieldName: string;
  children: ReactNode;
}

export default function FilterField({ fieldName, children }: Props) {
  return (
    <Accordion
      defaultExpanded
      disableGutters
      sx={{ m: 0, p: '0 40px', boxShadow: 'none' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ m: 0, p: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
          {fieldName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ m: 0, p: 0, mb: '12px' }}>
        <FormGroup>{children}</FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}
