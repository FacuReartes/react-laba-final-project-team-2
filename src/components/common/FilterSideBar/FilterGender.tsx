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
  selectedGender: { Men: boolean; Women: boolean };
  onGenderChange: (gender: 'Men' | 'Women') => void;
}

export interface GenderTypes {
  Men: boolean;
  Women: boolean;
}

export const FilterGender = ({ selectedGender, onGenderChange }: Props) => {
  return (
    <Accordion defaultExpanded disableGutters sx={{ m: 0, p: '0 40px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ m: 0, p: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>
          Gender
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ m: 0, p: 0, mb: '12px' }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedGender.Men}
                onChange={() => onGenderChange('Men')}
                name="Men"
              />
            }
            label="Men"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedGender.Women}
                onChange={() => onGenderChange('Women')}
                name="Women"
              />
            }
            label="Women"
          />
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};
