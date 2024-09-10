import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  selectedKids: { Boys: boolean; Girls: boolean };
  onKidsChange: (kids: 'Boys' | 'Girls') => void;
}
export interface KidsStateTypes {
  Boys: boolean;
  Girls: boolean;
}

export const FilterKids = ({ selectedKids, onKidsChange }: Props) => {
  return (
    <Accordion defaultExpanded disableGutters sx={{ m: 0, p: '0 40px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ m: 0, p: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Kids</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ m: 0, p: 0, mb: '12px' }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedKids.Boys}
                onChange={() => onKidsChange('Boys')}
                name="Boys"
              />
            }
            label="Boys"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedKids.Girls}
                onChange={() => onKidsChange('Girls')}
                name="Girls"
              />
            }
            label="Girls"
          />
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};
