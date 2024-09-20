import { DataType } from '@/lib/definitions';
import { FormControlLabel, List, ListItem, Checkbox } from '@mui/material';
import React from 'react';

interface Props {
  array: DataType[];
  handleToggle: (id: number) => void;
}

export default function CheckboxList({ array, handleToggle }: Props) {
  return (
    <List
      sx={{
        overflowY: 'auto',
        maxHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        p: '10px 0',
      }}
    >
      {array?.map(element => (
        <ListItem
          key={'id-' + element.name}
          sx={{ height: '20px', boxSizing: 'border-box', p: 0 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={element.selected}
                onChange={() => handleToggle(element.id)}
                name={element.name}
                size="small"
              />
            }
            label={element.name}
            sx={{ fontSize: '16px' }}
          />
        </ListItem>
      ))}
    </List>
  );
}
