import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import { LazyQueryExecFunction, OperationVariables } from '@apollo/client';

const SearchForm = ({ getMovies }: { getMovies: LazyQueryExecFunction<any, OperationVariables> }) => {

  const [searchText, setSearchText] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>, searchText: string) => {
    event.preventDefault();
    
    if (!searchText.trim()) return;
    getMovies({ variables: { searchQuery: searchText } })
  };

  return (
    <Box component="header" role="search">
        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight={200}
            align="center"
          >
            Looking for a movie?
          </Typography>
          <Box component="form" onSubmit={(e) => handleSearch(e, searchText)}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="search-field">Search</InputLabel>
              <OutlinedInput
                id="search-field"
                type="text"
                value={searchText}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      aria-label="search"
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search"
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
  )
}

export default SearchForm