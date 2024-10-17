import { Box, FormGroup, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CheckboxList from './CheckboxList';
import { DataType } from '@/lib/definitions';

interface Props {
  id: string;
  placeholder: string;
  list: DataType[];
  onChange: (id: number) => void;
}

export default function SearchCheckboxList({
  placeholder,
  list,
  id,
  onChange,
}: Props) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredList, setFilteredList] = useState<DataType[]>([]);

  useEffect(() => {
    if (list.length > 0) {
      setFilteredList(list);
    }
  }, [list]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchQuery(term);
    setFilteredList(
      list.filter(item => item.name.toLowerCase().includes(term.toLowerCase()))
    );
  };

  const handleToggle = (itemId: number) => {
    onChange(itemId);
  };

  return (
    <FormGroup>
      <TextField
        placeholder={placeholder}
        id={`search-field-${id}`}
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        sx={{
          input: {
            color: '#000',
            height: '33px',
            boxSizing: 'border-box',
            fontSize: '12px',
          },
          width: '100%',

          display: { xs: 'none', md: 'flex' },
          mt: '8px',
          mb: '30px',
        }}
        InputLabelProps={{
          style: { color: '#5C5C5C' },
        }}
        InputProps={{
          style: { borderRadius: '50px', color: '#000' },
          startAdornment: (
            <InputAdornment position="start">
              <Box component="img" alt="search" src="/search.svg" />
            </InputAdornment>
          ),
        }}
      />
      <CheckboxList array={filteredList} handleToggle={handleToggle} />
    </FormGroup>
  );
}
